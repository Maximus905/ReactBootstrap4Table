import {
    CTRL_DOWN, CTRL_UP,
    PAGE_RESIZING,
    SET_SCROLL_SIZES,
    TABLE_RESIZING,
    SET_SORTING,
    ADD_SORTING,
    INVALIDATE_DATA,
    RESET_INVALIDATE_DELAY,
    LOADING_DATA, REQUEST_DATA, RECEIVE_DATA,
    CHANGE_FILTER,
    LOADING_FILTER_LIST, REQUEST_FILTER_LIST, RECEIVE_FILTER_LIST
} from "../constatnts/actions";
import {
    calculateColumnsDim,
    tableWidth,
    changeSorting,
    app_changeFilter, app_filters_setFilterInLoadingState, app_filters_receiveFilterList
} from "../helpers";

// import {changeSorting} from "../helpers/sortingHandler";
import {loadingData, receiveData, loadingFilterList, receiveFilterList} from "../actions";
import {TIMEOUT_CHANGE_SORTING} from "../constatnts/timeouts";

/**
 * using for dispatching async actions like request data from server
 * @param dispatch
 * @return {Function}
 */
export function dispatchMiddleware(dispatch) {
    async function getData({dispatch, fetchFunction, filters, sorting}) {
        dispatch(loadingData())
        const data = await fetchFunction({filters, sorting})
        dispatch(receiveData(data))
    }
    async function getFilterList({dispatch, fetchFunction, filters, accessor}) {
        dispatch(loadingFilterList(accessor))
        const data = await fetchFunction({accessor,filters})
        dispatch(receiveFilterList({accessor, data}))
    }
    return (action) => {
        const {type, payload} = action
        const {fetchFunction, filters, sorting, accessor} = payload
        switch (type) {
            case REQUEST_DATA:
                return getData({dispatch, fetchFunction, filters, sorting})
            case REQUEST_FILTER_LIST:
                return getFilterList({dispatch, fetchFunction, filters, accessor})
            default:
                return dispatch(action)
        }
    }
}
export const rootReducer = (state, action) => {
    const {payload, type} = action
    const {dimensions, columnsSettings, sorting, filters, filtersSettings, didInvalidate} = state
    const newState = {}
    switch (type) {
        case CTRL_DOWN:
            return {...state, isCtrlPressed: true}
        case CTRL_UP:
            return {...state, isCtrlPressed: false}
        case SET_SCROLL_SIZES:
            const {vScroll, hScroll} = payload
            return {...state, dimensions: {...dimensions, vScroll, hScroll}}
        case PAGE_RESIZING:
            const {tBoxWidth, tBoxHeight, tBodyBoxWidth, tBodyBoxHeight} = payload
            return {...state, dimensions: {...dimensions, tBoxWidth, tBoxHeight, tBodyBoxWidth, tBodyBoxHeight}}
        case TABLE_RESIZING:
            const newDimensions = calculateColumnsDim({tBoxWidth: dimensions.tBoxWidth, vScroll: dimensions.vScroll, columnsSettings})
            const keys = Object.keys(newDimensions)
            const newColumnsSettings = {}
            Object.entries(columnsSettings).forEach(([accessor, settings]) => {
                newColumnsSettings[accessor] = keys.includes(accessor) ? {...settings, width: newDimensions[accessor].width} : settings
            })
            const newTableWidth = tableWidth({columnsSettings: newColumnsSettings})
            return {...state, dimensions: {...dimensions, tWidth: newTableWidth}, columnsSettings: newColumnsSettings}
        case SET_SORTING:
            return {...state, sorting: changeSorting({sorting, accessor: payload}), invalidateWithDelay: TIMEOUT_CHANGE_SORTING}
        case ADD_SORTING:
            return {...state, sorting: changeSorting({sorting, accessor: payload, appendMode: true}), invalidateWithDelay: TIMEOUT_CHANGE_SORTING}
// data handling
        case INVALIDATE_DATA:
            return {...state, didInvalidate: true}
        case RESET_INVALIDATE_DELAY:
            return {...state, invalidateWithDelay: false}
        case LOADING_DATA:
            return {...state, isLoading: true, didInvalidate: false}
        case RECEIVE_DATA:
            return {...state, isLoading: false, didInvalidate: false, data: payload}
        case CHANGE_FILTER:
            const result = {...state,
                ...app_changeFilter({state, accessor: payload.accessor, type: payload.type, value: payload.value, selectAllState: payload.selectAllState})
            }
            return result
        case LOADING_FILTER_LIST:
            return {...state, filters: app_filters_setFilterInLoadingState({filters: state.filters, accessor: payload})}
        case RECEIVE_FILTER_LIST:
            return {...state, filters: app_filters_receiveFilterList({filters: state.filters, accessor: payload.accessor, data: payload.data})}
        default:
            return state
    }
}
