import {
    SWITCH_OPEN_STATE,
    CLICK_ON_ITEM,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    // CHECK_ALL,
    CHANGE_MENU_MAX_HEIGHT,
    CLICK_ON_SELECT_ALL,
    INITIALIZE_FILTER_LIST,
    CLEAR_FILTER_VALUE,
    UPDATE_FILTER_LIST, REOPEN_FILTER
} from "../constants/actions";

// ope/close filter
export const switchOpenState = () => ({type: SWITCH_OPEN_STATE})
export const reopenFilter = () => ({type: REOPEN_FILTER})

export const clickOnItem = (value) => ({type: CLICK_ON_ITEM, payload: value})
export const changeInput = (value) => ({type: CHANGE_INPUT, payload: value})
export const setItemSizes = ({width, height}) => ({type: SET_ITEM_SIZES, payload: {width, height}})
// export const checkAll = (checked) => ({type: CHECK_ALL, payload: checked})
export const clickOnSelectAll = () => ({type: CLICK_ON_SELECT_ALL})
export const changeMenuMaxHeight = (value) => ({type: CHANGE_MENU_MAX_HEIGHT, payload: value})
//filters
export const initializeFilterList = (initialState) => ({type: INITIALIZE_FILTER_LIST, payload: initialState})
export const clearFilterValue = () => ({type: CLEAR_FILTER_VALUE})
export const updateDataList = (data) => ({type: UPDATE_FILTER_LIST, payload: data})