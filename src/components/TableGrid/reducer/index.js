/**
 * store structure:
 * @typedef {{
 *     lid: string,
 *     office: string,
 *     didInvalidate: boolean,
 *     isLoading: boolean
 *     isSelected: boolean,
 *     isEdited: boolean
 * }} rowData
 * @typedef {{
 *      data: rowData[],
 *      didInvalidate: boolean,
 *      isLoading: boolean,
 * }} storage
 */

import {START_LOADING_ALL_DATA, REQUEST_DATA, RECEIVE_DATA, INVALIDATE_DATA} from '../constants/actions'
import {receiveData, loadingData} from '../actions'

export const initialState = {
    data: [],
    isLoading: false,
    didInvalidate: true,
}

/**
 * using for dispatching async actions like request data from server
 * @param dispatch
 * @return {Function}
 */
export function dispatchMiddleware(dispatch) {
    async function getData(dispatch, fetchFunction, filter) {
        dispatch(loadingData())
        const data = await fetchFunction(filter)
        return dispatch(receiveData({data}))
    }
    return (action) => {
        const {type, payload} = action
        switch (type) {
            case REQUEST_DATA:
                const {fetchFunction, filter} = payload
                return getData(dispatch, fetchFunction, filter)
            default:
                return dispatch(action)
        }
    }
}

const rootReducer = (state, action) => {
    console.log('reducer isLoading', state.isLoading)
    console.log('reducer didInvalidate', state.didInvalidate)
    const {payload, type} = action
    switch (type) {
        case START_LOADING_ALL_DATA:
            return {...state, isLoading: true}
        case RECEIVE_DATA:
            return {...state, data: payload.data, isLoading: false, didInvalidate: false}
        case INVALIDATE_DATA:
            return {...state, didInvalidate: true}
        default:
            return state
    }
}
export default rootReducer
