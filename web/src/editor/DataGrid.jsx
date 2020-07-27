import React from 'react'
import './DataGrid.css'
import { createRef } from 'react';

const XAxis = React.forwardRef(({ data, ...rest }, ref) =>
    <div className="data-grid-xaxis" ref={ref} {...rest}>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(" + data.length + ", 4rem)"
        }}>
            {data.map((value, c) => <span className="data-grid-header" key={c}>{value}</span>)}
        </div>
    </div>
)

const YAxis = React.forwardRef(({ data, ...rest }, ref) =>
    <div className="data-grid-yaxis" ref={ref} {...rest}>
        <div style={{
            display: "grid",
            gridTemplateRows: "repeat(" + data.length + ", 1.2rem)"
        }}>
            {data.map((value, c) => <span className="data-grid-header" key={c}>{value}</span>)}
        </div>
    </div>
)

class Cell extends React.PureComponent {
    state = {
        editing: false
    }

    handleDoubleClick = (e) => {
        console.log("clicked");
        this.setState({
            editing: true
        });
    }

    handleBlur = (e) => {
        this.setState({
            editing: false
        });
    }

    handleMouseDown = (e) => {
        this.props.onMouseDown(this.props.cellId);
    }

    render() {
        const { value, minimum, maximum, selected } = this.props;
        const { editing } = this.state;

        if (editing) {
            return <input className="data-grid-cell-input " onBlur={this.handleBlur} autoFocus />
        }

        const colorAngle = 100 - (value - minimum) / (maximum - minimum) * 90;

        return <span
            className="data-grid-cell"
            style={{ backgroundColor: "hsl(" + colorAngle + ", 100%, 30%)" }}
            onDoubleClick={this.handleDoubleClick}
            onMouseDown={this.handleMouseDown}
        >{value}</span>
    }
}

class Row extends React.PureComponent {
    handleMouseDown = (c) => {
        this.props.onMouseDown(this.props.rowId, c);
    }

    render() {
        const { row, minimum, maximum } = this.props;
        return <>
            {row.map((value, c) =>
                <Cell value={value} minimum={minimum} maximum={maximum} key={c} cellId={c} onMouseDown={this.handleMouseDown} />
            )}
        </>
    }
}

const Rows = React.forwardRef(({ data, minimum, maximum, onSelectStart, ...rest }, ref) =>
    <div className="data-grid-rows" ref={ref} {...rest}>
        <div style={{
            display: "grid",
            gridTemplateRows: "repeat(" + data.length + ", 1.2rem)",
            gridTemplateColumns: "repeat(" + data[0].length + ", 4rem)"
        }}>
            {data.map((row, r) =>
                <Row row={row} minimum={minimum} maximum={maximum} key={r} rowId={r} onMouseDown={onSelectStart} />
            )}
        </div>
    </div>
)

export default class DataGrid extends React.Component {
    rowsRef = createRef();
    scrollRef = createRef();
    xaxisRef = createRef();
    yaxisRef = createRef();
    lastTimeStamp = 0;
    lastScrollObject = null;

    scrolling = false;

    handleScroll = (e) => {
        if (!this.scrolling) {
            const target = e.currentTarget;
            const timeStamp = e.timeStamp;
            if (this.lastScrollObject !== target && timeStamp - this.lastTimeStamp < 300) {
                return;
            }
            this.scrolling = true;
            window.requestAnimationFrame(() => {
                const rows = this.rowsRef.current;
                const xAxis = this.xaxisRef.current;
                const yAxis = this.yaxisRef.current;
                const scroll = this.scrollRef.current;

                var scrollY, scrollX;

                if (target === rows) {
                    scrollY = rows.scrollTop;
                    scrollX = rows.scrollLeft;

                    const yRatio = (rows.scrollTop) / (rows.scrollHeight - rows.clientHeight);
                    const xRatio = (rows.scrollLeft) / (rows.scrollWidth - rows.clientWidth);
                    scroll.scrollTop = yRatio * (scroll.scrollHeight - scroll.clientHeight);
                    scroll.scrollLeft = xRatio * (scroll.scrollWidth - scroll.clientWidth);

                    xAxis.scrollLeft = scrollX;
                    yAxis.scrollTop = scrollY;
                } else if (target === yAxis) {
                    scrollY = yAxis.scrollTop;
                    scrollX = rows.scrollLeft;
                    rows.scrollTop = scrollY;

                    const yRatio = (yAxis.scrollTop) / (yAxis.scrollHeight - yAxis.clientHeight);
                    scroll.scrollTop = yRatio * (scroll.scrollHeight - scroll.clientHeight);
                } else if (target === xAxis) {
                    scrollY = rows.scrollTop;
                    scrollX = xAxis.scrollLeft;
                    rows.scrollLeft = scrollX;

                    const xRatio = (xAxis.scrollLeft) / (xAxis.scrollWidth - xAxis.clientWidth);
                    scroll.scrollLeft = xRatio * (scroll.scrollWidth - scroll.clientWidth);
                } else if (target === scroll) {
                    const yRatio = (scroll.scrollTop) / (scroll.scrollHeight - scroll.clientHeight);
                    const xRatio = (scroll.scrollLeft) / (scroll.scrollWidth - scroll.clientWidth);

                    scrollY = yRatio * (rows.scrollHeight - rows.clientHeight);
                    scrollX = xRatio * (rows.scrollWidth - rows.clientWidth);

                    rows.scrollTop = scrollY;
                    rows.scrollLeft = scrollX;
                    xAxis.scrollLeft = scrollX;
                    yAxis.scrollTop = scrollY;
                }

                this.lastScrollObject = target;
                this.lastTimeStamp = timeStamp;
                this.scrolling = false;
            })
        }
    }

    handleSelectStart = (r, c) => {
        console.log(r, c);
    }

    render() {
        const { data, axisXLabel, axisYLabel, maximum, minimum, axisX, axisY } = this.props.table;

        const rowCount = data.length;
        const colCount = data[0].length;

        return <div className="data-grid">
            <div>
                <div className="data-grid-container" style={{
                    maxWidth: "calc(20px + 1.4rem + 4rem * " + (colCount + 1) + ")",
                    maxHeight: "calc(22px + 1.4rem + 1.2rem * " + (rowCount + 1) + ")"
                }}>
                    <span className="data-grid-xaxis-label">{axisXLabel}</span>
                    <span className="data-grid-yaxis-label">{axisYLabel}</span>
                    <XAxis ref={this.xaxisRef} data={axisX} onScroll={this.handleScroll} />
                    <YAxis ref={this.yaxisRef} data={axisY} onScroll={this.handleScroll} />
                    <Rows ref={this.rowsRef} data={data} minimum={minimum} maximum={maximum} onScroll={this.handleScroll} onSelectStart={this.handleSelectStart} />
                    <div className="data-grid-scroll" ref={this.scrollRef} onScroll={this.handleScroll} >
                        <div style={{
                            height: "calc(1.2rem * " + rowCount + ")",
                            width: "calc(4rem * " + colCount + ")"
                        }} />
                    </div>
                </div>
            </div>
        </div>
    }
}