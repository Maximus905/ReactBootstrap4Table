import {CLICK_ON_ITEM, CHANGE_INPUT, SET_ITEM_SIZES, CHECK_ALL, CHANGE_MENU_MAX_HEIGHT} from "../constants/actions"
import {useMemo} from "react";

const rootReducer = (state, action) => {
    const {type, payload} = action
    const checkedCounter = () => state.data.reduce((acc, item) => item.checked ? ++acc : acc, 0)
    switch (type) {
        case CLICK_ON_ITEM:
            const lastClicked = {value: payload.value}
            const data = state.data.map(item => {
                if (item[payload.valueFieldName] !== payload.value) return item
                lastClicked.checked = !item.checked
                return  {...item, checked: !item.checked}
            })
            return {...state, data, lastClicked}
        case CHANGE_INPUT:
            return {...state, inputValue: payload}
        case SET_ITEM_SIZES:
            return {...state, itemWidth: payload.width, itemHeight: payload.height}
        case CHECK_ALL:
            return {...state, data: state.data.map(item => ({...item, checked: payload}))}
        case CHANGE_MENU_MAX_HEIGHT:
            return  {...state, maxHeight: payload}
        default:
            return state
    }
}
export default rootReducer