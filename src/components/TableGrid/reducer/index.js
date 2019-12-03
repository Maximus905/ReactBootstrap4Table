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
 *      sorting: Array,
 *      isCtrlPressed: boolean,
 *      didInvalidate: boolean,
 *      isLoading: boolean,
 * }} storage
 */

import {START_LOADING_ALL_DATA, REQUEST_DATA, RECEIVE_DATA, INVALIDATE_DATA, ADD_SORTING, SET_SORTING, CTRL_DOWN, CTRL_UP} from '../constants/actions'
import {receiveData, loadingData, ctrlDown, ctrlUp} from '../actions'
import {changeSorting} from './helpers'

/**
 *
 * @type {storage} initialState
 */
export const initialState = {
    data: [],
    sorting: [],
    isCtrlPressed: false,
    isLoading: false,
    didInvalidate: true,
}

/**
 * using for dispatching async actions like request data from server
 * @param dispatch
 * @return {Function}
 */
export function dispatchMiddleware(dispatch) {
    async function getData(dispatch, fetchFunction, filter, sorting) {
        dispatch(loadingData())
        const data = await fetchFunction(filter, sorting)
        return dispatch(receiveData({data}))
    }
    return (action) => {
        const {type, payload} = action
        switch (type) {
            case REQUEST_DATA:
                const {fetchFunction, filter, sorting} = payload
                return getData(dispatch, fetchFunction, filter, sorting)
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
        case ADD_SORTING:
            return {...state, sorting: changeSorting(state.sorting, payload, true), didInvalidate: true}
        case SET_SORTING:
            return {...state, sorting: changeSorting(state.sorting, payload), didInvalidate: true}
        case CTRL_DOWN:
            return {...state, isCtrlPressed: true}
        case CTRL_UP:
            return {...state, isCtrlPressed: false}
        default:
            return state
    }
}
export default rootReducer
