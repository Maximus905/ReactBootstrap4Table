import React, {createContext, useEffect, useReducer, useState} from "react"
import PropTypes from 'prop-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {changeMenuMaxHeight, changeSimpleSearchInput, clickOnSettingsItem, initializeFilterList} from "../actions";
import ft from "../../../constatnts/filterTypes";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
//***********************5********************
    //const {state, dispatch, accessor, children, data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, bdColor, emptyWildcard, valueFieldName, labelFieldName, checkedFieldName, openSettingsMenu, closeSettingsMenu, filterSettings, onClickSaveSettings, onChangeSimpleSearch} = props
//**********************5e******************
//*********4*************
    const {accessor, children, data, filterSettings, filterSettings: {filterBy, type},
        maxHeight, maxWidth, fontRatio, bdColor,
        emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
        openSettingsMenu, closeSettingsMenu, onChangeFilter: onChangeFilterExt, onSaveSettings: onSaveSettingsExt} = props
    /// settings filter
    const initialSettingList = filterSettings && filterSettings.allowedTypes.map(key => {
        return ({
            value: ft[key].value,
            label: ft[key].label,
            checked: ft[key].value === filterSettings.type,
        })
    })
    const [settingList, setSettingList] = useState(initialSettingList)

    let checkedItemsCounter = data.length
    // const replaceEmptyLabels = () => data.map(item => {
    //     checkedItemsCounter = item[checkedFieldName] ? ++checkedItemsCounter : checkedItemsCounter
    //     return  item[labelFieldName]
    //         ? {value: item[valueFieldName], label: item[labelFieldName], checked: item[checkedFieldName]}
    //         : {value: item[valueFieldName], label: emptyWildcard, checked: item[checkedFieldName]}
    // })
    // const convertData = () => data.map(item => {
    //     checkedItemsCounter = item[checkedFieldName] ? ++checkedItemsCounter : checkedItemsCounter
    //     return {...item, label: item[labelFieldName], checked: item[checkedFieldName]}
    // })
    const replaceEmptyLabels = (checkStatus = true) => data.map(item => {
        return  item[labelFieldName]
            ? {value: item[valueFieldName], label: item[labelFieldName], checked: checkStatus}
            : {value: item[valueFieldName], label: emptyWildcard, checked: checkStatus}
    })
    const convertData = (checkStatus = true) => data.map(item => {
        return {...item, label: item[labelFieldName], checked: checkStatus}
    })
    const initialFilterList = emptyWildcard ? replaceEmptyLabels() : convertData()
    // state and dispatch for DropDown
    const [state, dispatch] = useReducer(rootReducer, {...initialState, data: initialFilterList, maxHeight, maxWidth, checkedItemsCounter})
    const {selectAll: selectAllState, filterValue} = state

    const onClickSaveSettings = ((accessor) => () => {
        const newType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        if (newType === ft.LIST.value) dispatch(initializeFilterList({data: initialFilterList, selectAll: true, checkedItemsCounter}))
        onSaveSettingsExt({accessor, newType})
        closeSettingsMenu()
    })(accessor)

    useEffect(() => {
        onClickSaveSettings()
    }, [settingList])

    const onClickSettingItem = (value) => {
        setSettingList(settingList.map(item => ({...item, checked: item.value === value})))
        dispatch(clickOnSettingsItem())
    }



    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter filterBy or type
    useEffect(() => {
        console.log('change filter type', filterBy, type, selectAllState, filterValue)
        onChangeFilterExt({accessor, filterBy, type, value: filterValue, selectAllState})
    }, [filterBy, type])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        console.log('change filter value', filterBy, type, selectAllState, filterValue)
        // const value = (type === ft.LIST.value) ? [...checkedItems] : [simpleSearchValue]
        onChangeFilterExt({accessor, filterBy, type, value: filterValue, selectAllState})
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
            openSettingsMenu, closeSettingsMenu,
            settingList, onClickSettingItem, onClickSaveSettings
        }}>
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
