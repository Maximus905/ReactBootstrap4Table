import React, {createContext, useEffect, useReducer} from "react"
import PropTypes from 'prop-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {changeMenuMaxHeight} from "../actions";

export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {children, data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName} = props
    const replaceEmptyLabels = () => data.map(item => item[labelFieldName] ? item : {...item, [labelFieldName]: emptyWildcard})

    const [state, dispatch] = useReducer(rootReducer, {...initialState, data : emptyWildcard ? replaceEmptyLabels() : data, maxHeight, maxWidth})
    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])
    useEffect(() => {
        if (state.lastClicked.value !== null) onClickItem(state.lastClicked)
    }, [state.lastClicked])
    return (
        <DropdownContext.Provider value={{state, dispatch, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName}}>
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
    labelFieldName: PropTypes.string
}
