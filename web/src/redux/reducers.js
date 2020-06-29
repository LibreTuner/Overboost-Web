import { combineReducers } from 'redux'
import { ADD_TABLE, OPEN_TABLE, SELECT_TABLE, CLOSE_TABLE, SELECT_PID } from './actions'

function tables(state = [], action) {
    switch (action.type) {
        case ADD_TABLE:
            return {
                tables: [
                    ...state,
                    action.table
                ]
            }
        default:
            return state
    }
}

function pids(state = [], action) {
    switch (action.type) {
        case SELECT_PID:
            return state.map(pid => {
                if (pid.id !== action.pid) {
                    return pid;
                }
                return Object.assign({}, pid,
                    {
                        checked: action.value
                    },
                )
            });
        default:
            return state;
    }
}

function tableCategories(state = [], action) {
    return state
}

function openedTables(state = [], action) {
    switch (action.type) {
        case OPEN_TABLE:
            if (state.includes(action.tableId)) {
                return state;
            } else {
                return [
                    ...state,
                    action.tableId
                ];
            }
        case CLOSE_TABLE:
            return state.filter(id => id !== action.tableId);
        default:
            return state;
    }
}

function selectedTable(state = '', action) {
    switch (action.type) {
        case OPEN_TABLE:
        case SELECT_TABLE:
            return action.tableId;
        default:
            return state;
    }
}

function selectedDatalink(state = '', action) {
    return state;
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const overboost = combineReducers({
    tables,
    tableCategories,
    openedTables,
    selectedTable,
    pids,
    selectedDatalink,
});

export default overboost