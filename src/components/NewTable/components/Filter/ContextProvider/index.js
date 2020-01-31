import React, {createContext, useEffect, useReducer} from "react"
import PropTypes from 'prop-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {changeMenuMaxHeight, changeSimpleSearchInput} from "../actions";

export const DropdownContext = createContext()

export const ContextProvider = (props) => {
//***********************5********************
    //const {state, dispatch, accessor, children, data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, openSettingsMenu, closeSettingsMenu, filterSettings, onClickSaveSettings, onChangeSimpleSearch} = props
//**********************5e******************
//*********4*************
    const {accessor, children, data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, openSettingsMenu, closeSettingsMenu, filterSettings, onClickSaveSettings, onChangeSimpleSearch} = props
     let checkedItemsCounter = 0
     const replaceEmptyLabels = () => data.map(item => {
         checkedItemsCounter = item[checkedFieldName] ? ++checkedItemsCounter : checkedItemsCounter
         return  item[labelFieldName]
             ? {value: item[valueFieldName], label: item[labelFieldName], checked: item[checkedFieldName]}
             : {value: item[valueFieldName], label: emptyWildcard, checked: item[checkedFieldName]}
     })
     const convertData = () => data.map(item => {
         checkedItemsCounter = item[checkedFieldName] ? ++checkedItemsCounter : checkedItemsCounter
         return {...item, label: item[labelFieldName], checked: item[checkedFieldName]}
     })
     // state and dispatch for DropDown
     const [state, dispatch] = useReducer(rootReducer, {...initialState, data : emptyWildcard ? replaceEmptyLabels() : convertData(), maxHeight, maxWidth, checkedItemsCounter})
    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])
    useEffect(() => {
        if (state.lastClicked.value !== null) {
            console.log('on click item', data.length, state.checkedItems, onClickItem)
            onClickItem({accessor, item: state.lastClicked})
        }
    }, [state.lastClicked, onClickItem])
    // fired when change amount of checked items or data list length
    // useEffect(() => {
    //     onSelectAll(state.checkedItems === state.data.length)
    // }, [state.checkedItems, onSelectAll, state.data.length]);

    useEffect(() => {
        onChangeSimpleSearch(state.simpleSearchInputValue)
    }, [state.simpleSearchInputValue])

    useEffect(() => {
        console.log('change checkedItems: ', state.checkedItems)
    }, [state.checkedItems])
    useEffect(() => {
        console.log('filter settings ', accessor, filterSettings)
        dispatch(changeSimpleSearchInput(''))
    }, [filterSettings])

    return (
        <DropdownContext.Provider value={{state, dispatch, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, openSettingsMenu, closeSettingsMenu, filterSettings, onClickSaveSettings, onChangeSimpleSearch}}>
            {children}
        </DropdownContext.Provider>
    )
}
ContextProvider.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onClickItem: PropTypes.func,
    onClickSaveSettings: PropTypes.func,
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    bdColor: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
    openSettingsMenu: PropTypes.func,
    closeSettingsMenu: PropTypes.func,
}
