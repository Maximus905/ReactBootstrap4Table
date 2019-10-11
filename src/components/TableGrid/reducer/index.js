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

import {START_LOADING_ALL_DATA, REQUEST_ALL_DATA, RECEIVE_ALL_DATA,
    START_LOADING_DATA_BY_ID, REQUEST_DATA_BY_ID, RECEIVE_DATA_BY_ID} from '../constants/actions'
import {getRcList, getLocationsList} from '../async/server'
import {requestAllData, receiveAllData} from '../actions'


const initialRowDataStatus = {
    didInvalidate: false,
    isLoading: false,
    isSelected: false,
    isEditing: false
}

export const initialState = {
    data: [],
    isLoading: false,
    didInvalidate: false,
}

/**
 * using for dispatching async actions like request data from server
 * @param dispatch
 * @return {Function}
 */
export function dispatchMiddleware(dispatch) {
    async function getData(dispatch, action) {
        const res = await getLocationsList(action.payload.filter)
        return dispatch(receiveAllData(res))
    }
    return (action) => {
        const {type} = action
        switch (type) {
            case REQUEST_ALL_DATA:
                return getData(dispatch)
            default:
                return dispatch(action)
        }
    }
}

const rootReducer = (state, action) => {
    const {payload, type} = action
    switch (type) {
        case START_LOADING_ALL_DATA:
            return Object.assign(state, {isLoading: true, didInvalidate: true})
        case RECEIVE_ALL_DATA:
            return Object.assign(state, {data: payload.data, isLoading: false, didInvalidate: false})
        case REQUEST_DATA_BY_ID:
            return state
        case RECEIVE_DATA_BY_ID:
            return state
        default:
            return state
    }
}
export default rootReducer
