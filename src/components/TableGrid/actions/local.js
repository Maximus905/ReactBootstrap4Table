import {
    INVALIDATE_DATA,
    ADD_SORTING,
    SET_SORTING,
    CTRL_DOWN,
    CTRL_UP,
    ADD_FILTER_VALUE,
    REMOVE_FILTER_VALUE,
    SET_FILTER_VALUE,
    SET_FILTER_TYPE,
} from '../constants/actions'

export const invalidateData = () => ({type: INVALIDATE_DATA})
export const addSorting = (accessor) => ({type: ADD_SORTING, payload: accessor})
export const setSorting = (accessor) => ({type: SET_SORTING, payload: accessor})
export const ctrlDown = () => ({type: CTRL_DOWN})
export const ctrlUp = () => ({type: CTRL_UP})
export const addFilterValue =({accessor, value}) => ({type: ADD_FILTER_VALUE, payload: {accessor, value}})
export const removeFilterValue =({accessor, value}) => ({type: REMOVE_FILTER_VALUE, payload: {accessor, value}})
export const setFilterValue = ({accessor, value}) => ({type: SET_FILTER_VALUE, payload: {accessor, value}})
/**
 *
 * @param {string} accessor
 * @param {string} type
 * @return {{type: string, payload: {accessor: string, type: string}}}
 */
export const setFilterType = ({accessor, type}) => ( {type: SET_FILTER_TYPE, payload: {accessor, type}})