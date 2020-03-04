import {
    SWITCH_OPEN_STATE,
    CLICK_ON_ITEM,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    CHANGE_MENU_MAX_HEIGHT,
    INITIALIZE_DATA_LIST,
    CLEAR_CHECKED_ITEMS_LIST,
    UPDATE_DATA_LIST, REOPEN,
    LOADING_DATA,
    RECEIVE_DATA, RECEIVE_INVALID_DATA
} from "../constants/actions";

// ope/close
export const switchOpenState = () => ({type: SWITCH_OPEN_STATE})
export const reopen = () => ({type: REOPEN})

export const clickOnItem = (value) => ({type: CLICK_ON_ITEM, payload: value})
export const changeInput = (value) => ({type: CHANGE_INPUT, payload: value})
export const setItemSizes = ({width, height}) => ({type: SET_ITEM_SIZES, payload: {width, height}})
export const changeMenuMaxHeight = (value) => ({type: CHANGE_MENU_MAX_HEIGHT, payload: value})
export const initializeDataList = (initialState) => ({type: INITIALIZE_DATA_LIST, payload: initialState})
export const clearCheckedItemsList = () => ({type: CLEAR_CHECKED_ITEMS_LIST})
export const updateDataList = (data) => ({type: UPDATE_DATA_LIST, payload: data})
export const loadingData = () => ({type: LOADING_DATA})
export const receiveData = (data) => ({type: RECEIVE_DATA, payload: data})
export const receiveInvalidData = () => ({type: RECEIVE_INVALID_DATA})