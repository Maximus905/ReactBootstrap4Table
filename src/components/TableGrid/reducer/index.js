import {
    START_LOADING_ALL_DATA, REQUEST_DATA, RECEIVE_DATA, INVALIDATE_DATA,
    ADD_SORTING, SET_SORTING,
    CTRL_DOWN, CTRL_UP,
    SET_FILTER_TYPE, SET_FILTER_VALUE, ADD_FILTER_VALUE, REMOVE_FILTER_VALUE} from '../constants/actions'
import {receiveData, loadingData} from '../actions'
import {changeSorting} from './helpers'
import {filterTemplate} from "../constants/initial";

/**
 * @param {Filters} filters
 * @param {string} accessor
 * @param {FilterTypeItem} filterType
 * @return {Filters}
 */
const setFilterType = (filters, accessor, filterType) => {
    const item = {
        ...filterTemplate,
        type: filterType.value,
        loadFromServer: filterType.loadFromServer,
        didInvalidate: filterType.loadFromServer
    }
    return {...filters, [accessor]: item}
}
const setFilterValue = (filters, accessor, value) => {
    return { ...filters, [accessor]: { ...filters[accessor], value: [value] } }
}
const addFilterValue = (filters, accessor, value) => {
    const current = filters[accessor]

    return { ...filters,
        [accessor]: { ...current,
            value: current.value.includes(value)
                ? current.value
                : current.value.push(value)
        }
    }
}
const remFilterValue = (filters, accessor, value) => {
    const current = filters[accessor]
    return { ...filters,
        [accessor]: { ...current,
            value: current.value.includes(value)
                ? current.value.filter(item => item !== value)
                : current.value
        }
    }
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

/**
 *
 * @param {StateShape} state
 * @param action
 * @return {StateShape}
 */
const rootReducer = (state, action) => {
    console.log('reducer isLoading', state.isLoading, action)
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
        case SET_FILTER_TYPE:
            return {...state, filters: setFilterType(state.filters, payload.accessor, payload.type)}
        case SET_FILTER_VALUE:
            return {...state, filters: setFilterValue(state.filters, payload.accessor, payload.type)}
        case ADD_FILTER_VALUE:
            return {...state, filters: addFilterValue(state.filters, payload.accessor, payload.type)}
        case REMOVE_FILTER_VALUE:
            return {...state, filters: remFilterValue(state.filters, payload.accessor, payload.type)}
        default:
            return state
    }
}
export default rootReducer
