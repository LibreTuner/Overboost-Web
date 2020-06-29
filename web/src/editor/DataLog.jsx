import React from 'react';
import './DataLog.css';
import Plot from 'react-plotly.js';

export default class DataLog extends React.Component {
    state = {

    }

    render() {
        const { ...rest } = this.props;
        const { data, axes } = this.state;

        return <div className="datalog" {...rest}>
            <div style={{ width: '100%', height: '100%' }}>
                <Plot
                    data={[{
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' }
                    }]}
                    layout={{ autosize: true, title: 'Log' }}
                    className="datalog-plot"
                    useResizeHandler
                />
            </div>
        </div>
    }
}