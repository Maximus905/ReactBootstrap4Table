import {
    REQUEST_ALL_DATA,
    RECEIVE_ALL_DATA,
    RECEIVE_DATA_BY_ID,
    REQUEST_DATA_BY_ID,
    CHANGE_FILTER
} from '../constants/actions'

/**
 *
 * @param {Object} filter
 * @return {{type: string, payload: {filter: Object}}}
 */
export const requestAllData = (filter) => ({type: REQUEST_ALL_DATA, payload: {filter}})
/**
 *
 * @param {Array} data
 * @return {{type: string, payload: {data: Array}}}
 */
export const receiveAllData = (data) => ({type: RECEIVE_ALL_DATA, payload: {data}})
/**
 *
 * @param {Object} filter
 * @param {Array} idList
 * @return {{type: string, payload: {filter: Object, idList: Array}}}
 */
export const requestRowsData = (filter, idList) => ({type: REQUEST_DATA_BY_ID, payload: {filter, idList}})
/**
 *
 * @param {Array} data
 * @return {{type: string, payload: {data: Array}}}
 */
export const receiveRowsData = (data) => ({type: RECEIVE_DATA_BY_ID, payload: {data}})
/**
 *
 * @param {Object} filter
 * @return {{type: string, payload: {filter: Object}}}
 */
export const changeFilter = (filter) => ({type: CHANGE_FILTER, payload: {filter}})

