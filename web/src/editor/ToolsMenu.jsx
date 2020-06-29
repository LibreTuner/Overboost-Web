import React from 'react';
import './ToolsMenu.css';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';

class ToolsMenu extends React.PureComponent {
    render() {
        const { table } = this.props;
        console.log(table);

        return <div className="tools-menu">
            {table === undefined ? <></> :
                <Plot
                    data={[
                        {
                            type: 'surface',
                            name: 'Map',
                            x: table.axisX,
                            y: table.axisY,
                            z: table.data,
                            showscale: false,
                            colorscale: [
                                [0, 'hsv(100, 100%, 50%)'],
                                [1, 'hsv(0, 100%, 50%)']
                            ]
                        }
                    ]}
                    layout={{
                        margin: {
                            l: 10,
                            r: 10,
                            t: 10,
                            b: 10
                        },
                        scene: {
                            aspectratio: {
                                x: 1,
                                y: 1,
                                z: 1
                            },
                            xaxis: {
                                color: '#dddddd'
                            },
                            yaxis: {
                                color: '#dddddd'
                            },
                            zaxis: {
                                color: '#dddddd'
                            }
                        },
                        autosize: true,
                        paper_bgcolor: '#3b3b3b',
                        plot_bgcolor: '#3b3b3b'
                    }}
                    useResizeHandler
                    className="table-plot"
                />
            }
        </div>
    }
}

export default connect((state, { tableId }) => ({ table: state.tables[tableId] }))(ToolsMenu)