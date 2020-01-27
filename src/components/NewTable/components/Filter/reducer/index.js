import {
    CLICK_ON_ITEM,
    CLICK_ON_SETTINGS_ITEM,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    SET_SETTINGS_ITEM_SIZES,
    CHECK_ALL,
    CHANGE_MENU_MAX_HEIGHT,
    CHANGE_SIMPLE_SEARCH_INPUT
} from "../constants/actions"

const rootReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case CLICK_ON_ITEM:
            const lastClicked = {value: payload}
            let checkedItems = 0
            const data = state.data.map(item => {
                if (item.value === payload) {
                    checkedItems = !item.checked ? ++checkedItems : checkedItems
                    lastClicked.checked = !item.checked
                    return  {...item, checked: !item.checked}
                }
                checkedItems = item.checked ? ++checkedItems : checkedItems
                return  item
            })
            return {...state, data, lastClicked, checkedItems}
        case CLICK_ON_SETTINGS_ITEM:
            const lastChosenSetting = {value: payload}
            return {...state, lastChosenSetting}
        case CHANGE_INPUT:
            return {...state, inputValue: payload}
        case CHANGE_SIMPLE_SEARCH_INPUT:
            return {...state, simpleSearchInputValue: payload}
        case SET_ITEM_SIZES:
            return {...state, itemWidth: payload.width, itemHeight: payload.height}
        case SET_SETTINGS_ITEM_SIZES:
            return {...state, settingItemWidth: payload.width, settingItemHeight: payload.height}
        case CHECK_ALL:
            return {...state,
                data: state.data.map(item => ({...item, checked: payload})),
                checkedItems: payload ? state.data.length : 0,
                lastClickSelectAll: Date.now()
            }
        case CHANGE_MENU_MAX_HEIGHT:
            return  {...state, maxHeight: payload}
        default:
            return state
    }
}
export default rootReducer