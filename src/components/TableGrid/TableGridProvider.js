import React, {useReducer, createContext} from 'react'
import rootReducer, {dispatchMiddleware} from './reducer'
import {initialState} from "./constants/initial";

export const TableGridContext = createContext()

const TableGridProvider = (props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const {children, ...context} = props
    return (
        <TableGridContext.Provider value={{state, dispatch: dispatchMiddleware(dispatch), ...context}}>
            {children}
        </TableGridContext.Provider>
    )
}

TableGridProvider.propTypes = {}

export default TableGridProvider