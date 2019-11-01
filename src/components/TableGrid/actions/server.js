import {
    START_LOADING_ALL_DATA,
    REQUEST_DATA,
    RECEIVE_DATA,
    CHANGE_FILTER
} from '../constants/actions'

export const loadingData = () => ({type: START_LOADING_ALL_DATA, payload: {}})
/**
 *
 * @param {function} fetchFunction
 * @param {Object} filter
 * @param sorting
 * @return {{type: string, payload: {filter: Object}}}
 */
export const requestData = ({fetchFunction, filter, sorting}) => ({type: REQUEST_DATA, payload: {fetchFunction, filter, sorting}})
/**
 *
 * @param {Array} data
 * @return {{type: string, payload: {data: Array}}}
 */
export const receiveData = ({data}) => ({type: RECEIVE_DATA, payload: {data}})
/**
 *
 * @param {Object} filter
 * @return {{type: string, payload: {filter: Object}}}
 */
export const changeFilter = ({filter}) => ({type: CHANGE_FILTER, payload: {filter}})

