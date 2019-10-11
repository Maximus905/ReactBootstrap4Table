import React, {useReducer, useEffect, createContext} from 'react'
import rootReducer, {initialState, dispatchMiddleware} from './reducer'


export const TableGridContext = createContext()

const Provider = (props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    return (
        <TableGridContext.Provider value={{state, dispatch: dispatchMiddleware(dispatch)}}>
            {props.children}
        </TableGridContext.Provider>
    )
}
export default Provider