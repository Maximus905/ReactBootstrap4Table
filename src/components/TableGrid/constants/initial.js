import {filterType} from "./filters";

/**
 * @type {StateShape} initialState
 */
export const initialState = {
    data: [],
    sorting: [],
    filter: {},
    isCtrlPressed: false,
    isLoading: false,
    didInvalidate: true,
}
/**
 * @type {FilterItemShape} filterTemplate
 */
export const filterTemplate = {
    predicate: filterType.EQ,
    value: [],
    loadFromServer: false,
    didInvalidate: false,
    isLoading: false
}