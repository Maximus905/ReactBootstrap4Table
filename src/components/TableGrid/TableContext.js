import React, {createContext} from 'react'

export const TableContext = createContext()

const TableContextProvider = (props) => {
    const {children, ...context} = props
    return (
        <TableContext.Provider value={{...context}}>
            {children}
        </TableContext.Provider>
    )
}
export default TableContextProvider