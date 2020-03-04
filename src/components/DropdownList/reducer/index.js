import check from 'check-types'
import {
    SWITCH_OPEN_STATE,
    REOPEN,
    CLICK_ON_ITEM,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    CHANGE_MENU_MAX_HEIGHT,
    INITIALIZE_DATA_LIST, CLEAR_CHECKED_ITEMS_LIST,
    UPDATE_DATA_LIST, LOADING_DATA, RECEIVE_DATA, RECEIVE_INVALID_DATA
} from "../constants/actions"
import {reopenDropdownListSetter} from "../helpers";
import {loadingData, receiveData, receiveInvalidData} from "../actions";
import {REQUEST_DATA} from "../../Table/constatnts/actions";

export function dispatchMiddleware(dispatch) {
    async function getData({dispatch, fetchFunction, accessor, filters, sorting}) {
        dispatch(loadingData())
        try {
            const data = await fetchFunction({accessor, filters, sorting})
            if (check.array(data)) {
                dispatch(receiveData(data))
            } else {
                console.log('Dropdown list: Invalid format of fetched data: ', data )
                throw  new Error('Dropdown list: Invalid format of fetched data from server!')
            }
        } catch (e) {
            alert(e.toString())
            dispatch(receiveInvalidData())
        }
    }
    return (action) => {
        const {type, payload} = action
        const {fetchFunction, accessor, filters, sorting} = payload || {}
        switch (type) {
            case REQUEST_DATA:
                return getData({dispatch, fetchFunction, accessor,  filters, sorting})
            default:
                return dispatch(action)
        }
    }
}

const rootReducer = (state, action) => {
    const {type, payload} = action
    const newState = {}
    switch (type) {
        case SWITCH_OPEN_STATE:
            return {...state, isOpened: !state.isOpened}
        case REOPEN:
            return {...state, ...reopenDropdownListSetter({reopen: state.reopen, isOpened: state.isOpened})}
        case CLICK_ON_ITEM:
            //add/remove clicked item into checkedItems array
            const itemIndex = state.checkedItems.indexOf(payload)
            if (itemIndex < 0) {
                newState.checkedItems = [...state.checkedItems, payload]
            } else {
                newState.checkedItems = state.checkedItems.filter(item => item !== payload)
            }
            //set checked status in data[]
            newState.checkedItemsCounter = 0
            const data = state.data.map(item => {
                if (item.value === payload) {
                    newState.checkedItemsCounter = !item.checked ? ++newState.checkedItemsCounter : newState.checkedItemsCounter
                    // lastClicked.checked = !item.checked
                    return  {...item, checked: !item.checked}
                }
                newState.checkedItemsCounter = item.checked ? ++newState.checkedItemsCounter : newState.checkedItemsCounter
                return  item
            })
            return {...state, data, ...newState}
        case INITIALIZE_DATA_LIST:
            return {...state, checkedItems: [], data: payload.data, checkedItemsCounter: payload.checkedItemsCounter}
        case CLEAR_CHECKED_ITEMS_LIST:
            return {...state, checkedItems: []}
        case UPDATE_DATA_LIST:
            // return {...state, data: payload}
            return {...state,
                data: payload,
                checkedItemsCounter: payload.reduce((acc, item) => item.checked ? ++acc : acc, 0),
                ...reopenDropdownListSetter({reopen: state.reopen, isOpened: state.isOpened})}
        case CHANGE_INPUT:
            // handle changing input value for dropdown filter search field
            return {...state, inputValue: payload}
        case SET_ITEM_SIZES:
            return {...state, itemWidth: payload.width, itemHeight: payload.height}
        case CHANGE_MENU_MAX_HEIGHT:
            return  {...state, maxHeight: payload}
        case LOADING_DATA:
            return {...state, isLoading: true, invalidData: false}
        case RECEIVE_DATA:
            return {...state, data: payload, isLoading: false, invalidData: false}
        case RECEIVE_INVALID_DATA:
            return {...state, data: [], isLoading: false, invalidData: true}
        default:
            return state
    }
}
export default rootReducer