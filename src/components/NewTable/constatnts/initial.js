import filterTypes from "./filterTypes";

export const initialState = {
    data: [],
    sorting: [],
    filters: {},
    isCtrlPressed: false,
    isLoading: false,
    invalidateWithDelay: 1200,
    didInvalidate: false,

    dimensions: {
        tWidth: 0,
        tBoxWidth: 0,
        tBoxHeight: 0,
        tBodyBoxWidth: 0,
        tBodyBoxHeight: 0,
        vScroll: 0,
        hScroll: 0
    },
    tableSettings: {},
    columnsSettings: {},
    visibleColumnsOrder: [],
    filtersSettings: {},
    custom: {}
}
export const tableSettingsTemplate = {
    width: 100,
    globalFilter: false,
    tableSmall: true,
    tableStriped: true,
    tableDark: true,
    tableBordered: true,
    tableBorderless: false,
    tableHover: true
}
export const oneColumnSettingsTemplate = {
    title: '',
    accessor: '',
    minWidth: 100,
    maxWidth: 900,
    isVisible: true,
    filterable: false,
    sortable: false,
}
export const oneFilterSettingsTemplate = {
    filterBy: '',
    type: filterTypes.EQ.value,
    allowedTypes: Object.values(filterTypes).map(item => item.value)
}
export const emptyTextFilterTemplate = {
    filterBy: '',
    value: [],
    type: '',
    // didInvalidate: false //calculated from filterType
}
export const emptyListFilterTemplate = {
    filterBy: '',
    value: [],
    selectAllState: true,
    list: [],
    type: '',
    // didInvalidate: true //calculated from filterType
}
