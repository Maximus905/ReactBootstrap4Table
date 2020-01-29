import {
    CTRL_DOWN, CTRL_UP,
    PAGE_RESIZING,
    SET_SCROLL_SIZES,
    TABLE_RESIZING,
    SET_SORTING,
    ADD_SORTING,
    INVALIDATE_DATA, LOADING_DATA, REQUEST_DATA, RECEIVE_DATA,
    SET_FILTER_TYPE,
    SET_FILTER_VALUE,
    INVALIDATE_FILTER_LIST, LOADING_FILTER_LIST, REQUEST_FILTER_LIST, RECEIVE_FILTER_LIST
} from "../constatnts/actions";
import {
    calculateColumnsDim,
    filters_ChangeFilterType,
    filtersSettings_ChangeFilterType,
    tableWidth,
    changeSorting,
    filters_setValue
} from "../helpers";

// import {changeSorting} from "../helpers/sortingHandler";
import {loadingData, receiveData, loadingFilterList, receiveFilterList} from "../actions";

/**
 * using for dispatching async actions like request data from server
 * @param dispatch
 * @return {Function}
 */
export function dispatchMiddleware(dispatch) {
    async function getData(dispatch, fetchFunction, filter, sorting) {
        dispatch(loadingData())
        const data = await fetchFunction({filter, sorting})
        dispatch(receiveData(data))
    }
    async function getFilterList(dispatch, fetchFunction, accessor, filter, sorting) {
        dispatch(loadingFilterList(accessor))
        const data = await fetchFunction({accessor,filter, sorting})
        dispatch(receiveFilterList({accessor, data}))
    }
    return (action) => {
        const {type, payload} = action
        const {fetchFunction, filter, sorting} = payload
        switch (type) {
            case REQUEST_DATA:
                return getData(dispatch, fetchFunction, filter, sorting)
            case REQUEST_FILTER_LIST:
                return getFilterList(dispatch, fetchFunction, filter, sorting)
            default:
                return dispatch(action)
        }
    }
}
export const rootReducer = (state, action) => {
    const {payload, type} = action
    const {dimensions, columnsSettings, sorting, filters, filtersSettings, didInvalidate} = state
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
            // console.log('set sorting')
            return {...state, sorting: changeSorting({sorting, accessor: payload})}
        case ADD_SORTING:
            // console.log('add sorting')
            return {...state, sorting: changeSorting({sorting, accessor: payload, appendMode: true}), didInvalidate: true}
// data handling
        case INVALIDATE_DATA:
            // console.log('invalidate data')
            return {...state, didInvalidate: true}
        case LOADING_DATA:
            // console.log('loading data')
            return {...state, isLoading: true, didInvalidate: false}
        case RECEIVE_DATA:
            // console.log('receive data')
            return {...state, isLoading: false, didInvalidate: false, data: payload}
// filters events handling
        case SET_FILTER_TYPE:
            // console.log('SET_FILTER_TYPE')
            const isValueEmpty = !filters[payload.accessor].value.length
            return {...state,
                filters: filters_ChangeFilterType({accessor: payload.accessor, type: payload.type, filters}),
                filtersSettings: filtersSettings_ChangeFilterType({accessor: payload.accessor, type: payload.type, filtersSettings}),
                didInvalidate: isValueEmpty ? didInvalidate : true
            }
        case SET_FILTER_VALUE:
            // console.log('reducer SET_FILTER_VALUE')
            return {...state,
                filters: filters_setValue({filters, value: payload.value, accessor: payload.accessor}),
                // didInvalidate: true
            }
        case LOADING_FILTER_LIST:
            return state
        case RECEIVE_FILTER_LIST:

        default:
            return state
    }
}
