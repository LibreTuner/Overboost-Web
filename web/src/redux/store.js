import { createStore } from "redux"
import overboost from "./reducers"

const defaultStore = {
    tables:
    {
        'open_loop_timing_overload': {
            name: 'Open Loop Timing (Overload)',
            data: Array.from(Array(32).keys()).map(r => Array.from(Array(14).keys()).map(c => (r + c))),
            axisX: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000],
            axisY: Array.from(Array(32).keys()).map(v => ((v + 1) / 16)),
            axisXLabel: 'Current RPM',
            axisYLabel: 'Current Load',
            maximum: 44,
            minimum: 0,
            width: 14,
        },

        'open_loop_timing_overload_2': {
            name: 'Open Loop Timing 2 (Overload)',
            data: Array.from(Array(32).keys()).map(r => Array.from(Array(14).keys()).map(c => (31 - r + 13 - c))),
            axisX: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000],
            axisY: Array.from(Array(32).keys()).map(v => ((v + 1) / 16)),
            axisXLabel: 'Current RPM',
            axisYLabel: 'Current Load',
            maximum: 44,
            minimum: 0,
            width: 14,
        }
    },

    tableCategories: [
        {
            name: 'Injection Timing',
            tables: [
                'open_loop_timing_overload',
                'open_loop_timing_overload_2'
            ]
        }
    ],

    pids: [
        {
            name: 'Test',
            id: 'test',
            checked: false,
        }
    ],

    selectedDatalink: 'passthru:C:\\WINDOWS\\SysWOW64\\op20pt32.dll',

    openedTables: [],

    selectedTable: '',
}

const store = createStore(overboost, defaultStore);

export default store