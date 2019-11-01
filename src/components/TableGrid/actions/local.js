import {
    INVALIDATE_DATA,
    ADD_SORTING,
    SET_SORTING,
    CTRL_DOWN,
    CTRL_UP
} from '../constants/actions'

export const invalidateData = () => ({type: INVALIDATE_DATA})
export const addSorting = (accessor) => ({type: ADD_SORTING, payload: accessor})
export const setSorting = (accessor) => ({type: SET_SORTING, payload: accessor})
export const ctrlDown = () => ({type: CTRL_DOWN})
export const ctrlUp = () => ({type: CTRL_UP})