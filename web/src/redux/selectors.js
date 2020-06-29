export const getTables = store => store.tables

export const getCategorizedTables = store => {
    const { tables, tableCategories } = store;

    return tableCategories.map(category => {
        return {
            name: category.name,
            tables: category.tables.map(id => ({
                id,
                ...tables[id]
            }))
        }
    })
}

export const getOpenedTablesMeta = store => {
    const { tables, openedTables } = store;
    return openedTables.map(tableId => ({
        name: tables[tableId].name,
        id: tableId
    }));
}