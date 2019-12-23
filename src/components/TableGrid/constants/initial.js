import {filterType} from "./filters";

/**
 * @type {StateShape} initialState
 */
export const initialState = {
    data: [],
    sorting: [],
    filters: {},
    isCtrlPressed: false,
    isLoading: false,
    didInvalidate: true,
}
/**
 * @type {FilterItemShape} filterTemplate
 */
export const filterTemplate = {
    type: filterType.EQ.value,
    value: [],
    notInList: false, // get all exclude items from list
    didInvalidate: false,
    isLoading: false
}

export const columnFilterSettingsTemplate = (filterBy) => ({
    filterBy,
    type: filterType.EQ.value,
    allowedTypes: Object.keys(filterType)
})