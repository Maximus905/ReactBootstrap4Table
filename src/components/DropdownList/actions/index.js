import {CLICK_ON_ITEM, CHANGE_INPUT, SET_ITEM_SIZES, CHECK_ALL, CHANGE_MENU_MAX_HEIGHT} from "../constants/actions";

export const clickOnItem = (value) => ({type: CLICK_ON_ITEM, payload: value})
export const changeInput = (value) => ({type: CHANGE_INPUT, payload: value})
export const setItemSizes = ({width, height}) => ({type: SET_ITEM_SIZES, payload: {width, height}})
export const checkAll = (checked) => ({type: CHECK_ALL, payload: checked})
export const changeMenuMaxHeight = (value) => ({type: CHANGE_MENU_MAX_HEIGHT, payload: value})