import {CLICK_ON_ITEM, CHANGE_INPUT, SET_ITEM_SIZES} from "../constants/actions";

export const clickOnItem = (value) => ({type: CLICK_ON_ITEM, payload: value})
export const changeInput = (value) => ({type: CHANGE_INPUT, payload: value})
export const setItemSizes = ({width, height}) => ({type: SET_ITEM_SIZES, payload: {width, height}})