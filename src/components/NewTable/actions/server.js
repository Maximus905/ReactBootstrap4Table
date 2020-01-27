import {
    LOADING_DATA,
    REQUEST_DATA,
    RECEIVE_DATA,
    INVALIDATE_DATA,

} from '../constatnts/actions'

export const loadingData = () => ({type: LOADING_DATA})
/**
 *
 * @param {any} fetchFunction
 * @param {Object} filters - from reducer state
 * @param {Object} sorting - from reducer state
 */
export const requestData = ({fetchFunction, filters, sorting}) => ({type: REQUEST_DATA, payload: {fetchFunction, filters, sorting}})
/**
 *
 * @param {Array} data
 * @return {{type: string, payload: Array}}
 */
export const receiveData = (data) => ({type: RECEIVE_DATA, payload: data})
export const invalidateData = () => ({type: INVALIDATE_DATA})