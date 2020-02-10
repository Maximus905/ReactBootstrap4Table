import React, {createContext, useEffect, useMemo, useReducer} from "react"
import PropTypes, {oneOfType} from 'prop-types'
import check from 'check-types'
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {
    changeFilterType,
    changeMenuMaxHeight, switchOpenState, updateFilterList,
    reopenFilter
} from "../actions";
import ft from "../../../constatnts/filterTypes";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {accessor, children, data, loadingState, filterSettings, filterSettings: {filterBy},
        maxHeight, maxWidth, fontRatio, bdColor,
        emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
        emptyListWildcard, loadingWildcard,
        openSettingsMenu, closeSettingsMenu,
        onChangeFilter: onChangeFilterExt, onSaveSettings: onSaveSettingsExt,
        onOpen: onOpenExt} = props
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

    // function for convert input data of filter list into format {value, label, checked}
    const replaceEmptyLabels = (checkStatus = true) => data.map(item => {
        return  item[labelFieldName]
            ? {value: item[valueFieldName], label: item[labelFieldName], checked: checkStatus}
            : {value: item[valueFieldName], label: emptyWildcard, checked: checkStatus}
    })
    const replaceKeyNames = (checkStatus = true) => data.map(item => {
        return {...item, label: item[labelFieldName], checked: checkStatus}
    })
    const createListFromArray = (checkStatus = true) => data.map(item => (
        item === null || item === undefined || item === ''
            ? {value: emptyWildcard, label: emptyWildcard, checked: checkStatus}
            : {value: item, label: item, checked: checkStatus}
    ))
    const convertFilterList = () => {
        if (data.length === 0) return data
        const testItem = data[0]
        if (check.object(testItem)) {
            return emptyWildcard ? replaceEmptyLabels() : replaceKeyNames()
        } else {
            return createListFromArray()
        }
    }
    // state and dispatch for DropDown
    const [state, dispatch] = useReducer(rootReducer, {...initialState,
        data: convertFilterList(),
        maxHeight, maxWidth,
        checkedItemsCounter,
        settingList: initialSettingList
    })
    const {selectAll: selectAllState, data: filterListState, filterValue, settingList, isOpened, reopen} = state

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
            newState.data = (value === ft.LIST.value) ? convertFilterList() : state.data
            newState.selectAll = (value === ft.LIST.value) ? true : selectAllState
            newState.checkedItemsCounter = (value === ft.LIST.value) ? convertFilterList().length : state.checkedItemsCounter
            dispatch(changeFilterType(newState))
        } else {
            closeSettingsMenu()
        }
    }
    const toggleOpenState = () => dispatch(switchOpenState())

    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        console.log('afterChangeType', state)
        const currentType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        // console.log('change filter value', accessor, filterBy, currentType, selectAllState, filterValue)
        onChangeFilterExt({accessor, filterBy, type: currentType, value: filterValue, selectAllState})
    }, [settingList, selectAllState, filterValue])

    // for lazy updating filter list when is filter opened or we change type of filter in open state
    useEffect(() => {
        if (isOpened) {
            console.log('settingFilterChanged open', accessor, filterSettings, isOpened)

            onOpenExt({accessor})
        }
    }, [isOpened])
    useEffect(() => {
        if (isOpened) {
            console.log('settingFilterChanged settings', accessor, filterSettings, isOpened)

            onOpenExt({accessor})
        }
        // if (isOpened) onOpenExt({accessor})
    }, [filterSettings])
    //update list of filter
    useEffect(() => {
        console.log('filter data changed', accessor, data)
        dispatch(updateFilterList(convertFilterList()))
    }, [data])
    // useEffect(() => {
    //     if (isOpened) {
    //         console.log('useEffect reopen start')
    //         dispatch(reopenFilter())
    //     }
    // }, [filterListState])
    //
    //watch reopen signal (reopen === true), reset them and open filter
    useEffect(() => {
        if (reopen) {
            console.log('useEffect reopen end')
            dispatch(reopenFilter())
        }
    }, [reopen])

    return (
        <DropdownContext.Provider value={{accessor, state, loadingState, dispatch,
            fontRatio, bdColor,
            emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
            emptyListWildcard, loadingWildcard,
            openSettingsMenu, closeSettingsMenu,
            settingList, onClickSettingItem, onClickSaveSettings, toggleOpenState
        }}>
            {children}
        </DropdownContext.Provider>
    )
}
ContextProvider.propTypes = {
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])),
    filterListLoading: PropTypes.bool,
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
