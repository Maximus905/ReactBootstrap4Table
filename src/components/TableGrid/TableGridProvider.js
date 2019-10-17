import React, {useReducer, useEffect, createContext} from 'react'
import PropTypes from 'prop-types'
import rootReducer, {initialState, dispatchMiddleware} from './reducer'

export const TableGridContext = createContext()

const TableGridProvider = (props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const {table, columns, getTableData} = props
    console.log('provider props', props, state.data.length)
    return (
        <TableGridContext.Provider value={{state, dispatch: dispatchMiddleware(dispatch), table, columns, getTableData}}>
            {props.children}
        </TableGridContext.Provider>
    )
}

TableGridProvider.propTypes = {}

export default TableGridProvider