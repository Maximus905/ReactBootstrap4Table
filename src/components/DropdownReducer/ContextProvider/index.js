import React, {createContext, useReducer} from "react"
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import Fuse from "fuse.js"

export const DropdownContext = createContext()

/**
 *
 * @param {{onClickItem: function, data: Array}} props
 */
export const ContextProvider = (props) => {
    const {children, data, maxHeight, maxWidth, onClickItem, fontRatio} = props

    const [state, dispatch] = useReducer(rootReducer, {...initialState, data, maxHeight, maxWidth})
    return (
        <DropdownContext.Provider value={{state, dispatch, onClickItem, fontRatio}}>
            {children}
        </DropdownContext.Provider>
    )
}
