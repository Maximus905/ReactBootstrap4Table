import React, {createContext, useEffect, useReducer} from "react"
import PropTypes from 'prop-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {changeMenuMaxHeight} from "../actions";

export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {children, data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, isOpen} = props
    let checkedItems = 0
    const replaceEmptyLabels = () => data.map(item => {
        checkedItems = item[checkedFieldName] ? ++checkedItems : checkedItems
        return  item[labelFieldName]
            ? {value: item[valueFieldName], label: item[labelFieldName], checked: item[checkedFieldName]}
            : {value: item[valueFieldName], label: emptyWildcard, checked: item[checkedFieldName]}
    })
    const convertData = () => data.map(item => {
        checkedItems = item[checkedFieldName] ? ++checkedItems : checkedItems
        return {...item, label: item[labelFieldName], checked: item[checkedFieldName]}
    })
    const [state, dispatch] = useReducer(rootReducer, {...initialState, data : emptyWildcard ? replaceEmptyLabels() : convertData(), maxHeight, maxWidth, checkedItems})
    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])
    useEffect(() => {
        if (state.lastClicked.value !== null) onClickItem(state.lastClicked)
    }, [state.lastClicked])
    useEffect(() => {
        console.log('selectAll', state.checkedItems === state.data.length)
        onSelectAll(state.checkedItems === state.data.length)
    }, [state.lastClickSelectAll]);

    return (
        <DropdownContext.Provider value={{state, dispatch, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName}}>
            {children}
        </DropdownContext.Provider>
    )
}
ContextProvider.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onClickItem: PropTypes.func,
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    bdColor: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
}
