import React, {createContext, useEffect, useReducer} from "react"
import PropTypes from 'prop-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {changeMenuMaxHeight, changeSimpleSearchInput} from "../actions";
import ft from "../../../constatnts/filterTypes";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
//***********************5********************
    //const {state, dispatch, accessor, children, data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, openSettingsMenu, closeSettingsMenu, filterSettings, onClickSaveSettings, onChangeSimpleSearch} = props
//**********************5e******************
//*********4*************
    const {accessor, children, data, filterSettings: {filterBy, type},
        maxHeight, maxWidth, fontRatio, bdColor,
        emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
        openSettingsMenu, closeSettingsMenu, onChangeFilter} = props

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
    const {selectAll: selectAllState, filterValue, simpleSearchInputValue: simpleSearchValue} = state

    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter filterBy or type
    useEffect(() => {
        console.log('change filter type', filterBy, type, selectAllState, filterValue)
        onChangeFilter({accessor, filterBy, type, value: filterValue, selectAllState})
    }, [filterBy, type])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        console.log('change filter value', filterBy, type, selectAllState, filterValue)
        // const value = (type === ft.LIST.value) ? [...checkedItems] : [simpleSearchValue]
        onChangeFilter({accessor, filterBy, type, value: filterValue, selectAllState})
    }, [selectAllState, filterValue])

    //*******************************
    // useEffect(() => {
    //     if (state.lastClicked.value !== null) {
    //         console.log('on click item', data.length, state.checkedItems, onClickItem)
    //         onClickItem({accessor, item: state.lastClicked})
    //     }
    // }, [state.lastClicked, onClickItem])
    // fired when change amount of checked items or data list length
    // useEffect(() => {
    //     onSelectAll(state.checkedItems === state.data.length)
    // }, [state.checkedItems, onSelectAll, state.data.length]);
    //*************************************
    //
    // useEffect(() => {
    //     console.log('change checkedItems: ', state.checkedItems)
    // }, [state.checkedItems])
    // useEffect(() => {
    //     console.log('filter settings ', accessor, filterSettings)
    //     dispatch(changeSimpleSearchInput(''))
    // }, [filterSettings])

    return (
        // <DropdownContext.Provider value={{state, dispatch, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, openSettingsMenu, closeSettingsMenu, filterSettings, onClickSaveSettings, onChangeSimpleSearch}}>
        <DropdownContext.Provider value={{state, dispatch,
            fontRatio, bdColor,
            emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
            openSettingsMenu, closeSettingsMenu}}>
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
