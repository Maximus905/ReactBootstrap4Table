import React, {createContext, useEffect, useMemo, useReducer} from "react"
import PropTypes from 'prop-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {
    changeFilterType,
    changeMenuMaxHeight,
} from "../actions";
import ft from "../../../constatnts/filterTypes";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {accessor, children, data, filterSettings, filterSettings: {filterBy},
        maxHeight, maxWidth, fontRatio, bdColor,
        emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
        openSettingsMenu, closeSettingsMenu, onChangeFilter: onChangeFilterExt, onSaveSettings: onSaveSettingsExt} = props
    /// settings filter
    const initialSettingList = useMemo(() => (
        filterSettings && filterSettings.allowedTypes.map(key => {
            return ({
                value: ft[key].value,
                label: ft[key].label,
                checked: ft[key].value === filterSettings.type,
            })
        })
    ), [filterSettings])

    let checkedItemsCounter = data.length

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
    const [state, dispatch] = useReducer(rootReducer, {...initialState,
        data: initialFilterList,
        maxHeight, maxWidth,
        checkedItemsCounter,
        settingList: initialSettingList
    })
    const {selectAll: selectAllState, filterValue, settingList} = state

    const onClickSaveSettings = ((accessor) => () => {
        const newType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        closeSettingsMenu()
        onSaveSettingsExt({accessor, newType})
    })(accessor)
    // auto close settings menu
    useEffect(() => {
        onClickSaveSettings()
    }, [settingList])

    const onClickSettingItem = (value) => {
        const currentType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        const newState = {}
        if (currentType !== value) {
            newState.settingList = settingList.map(item => ({...item, checked: item.value === value}))
            newState.filterValue = filterValue.length > 0 ? [] : filterValue
            newState.inputValue = ''
            newState.data = (value === ft.LIST.value) ? initialFilterList : state.data
            newState.selectAll = (value === ft.LIST.value) ? true : selectAllState
            newState.checkedItemsCounter = (value === ft.LIST.value) ? initialFilterList.length : state.checkedItemsCounter
            dispatch(changeFilterType(newState))
        } else {
            closeSettingsMenu()
        }
    }

    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        const currentType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        console.log('change filter value', accessor, filterBy, currentType, selectAllState, filterValue)
        onChangeFilterExt({accessor, filterBy, type: currentType, value: filterValue, selectAllState})
    }, [settingList, selectAllState, filterValue])

    return (
        <DropdownContext.Provider value={{accessor, state, dispatch,
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
