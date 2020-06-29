export const ADD_TABLE = 'ADD_TABLE'
export const OPEN_TABLE = 'OPEN_TABLE'
export const CLOSE_TABLE = 'CLOSE_TABLE'
export const SELECT_TABLE = 'SELECT_TABLE'
export const SELECT_PID = 'SELECT_PID'

export function addTable(table) {
    return { type: ADD_TABLE, table }
}

export function openTable(tableId) {
    return { type: OPEN_TABLE, tableId }
}

export function closeTable(tableId) {
    return { type: CLOSE_TABLE, tableId }
}

export function selectTable(tableId) {
    return { type: SELECT_TABLE, tableId }
}

export function selectPid(pid, value) {
    return { type: SELECT_PID, pid, value }
}