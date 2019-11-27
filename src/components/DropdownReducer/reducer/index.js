import {CLICK_ON_ITEM, CHANGE_INPUT, SET_ITEM_SIZES} from "../constants/actions"

const rootReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case CLICK_ON_ITEM:
            return {...state, data: state.data.map(item => item.value === payload ? {...item, checked: !item.checked} : item)}
        case CHANGE_INPUT:
            return {...state, inputValue: payload}
        case SET_ITEM_SIZES:
            return {...state, itemWidth: payload.width, itemHeight: payload.height}
        default:
            return state
    }
}
export default rootReducer