import React, {createContext, useEffect, useMemo, useReducer} from "react"
import PropTypes, {oneOfType} from 'prop-types'
import {convertDataList} from "../helpers";
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {
    changeMenuMaxHeight, switchOpenState, updateDataList,
    reopenFilter
} from "../actions";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {accessor, children, parentRef, data, loadingState, selectAll: selectAllIni, showSelectAll,
        maxHeight, maxWidth,minWidth, fontRatio, bdColor,
        emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
        emptyListWildcard, trueWildcard, falseWildcard, loadingWildcard,
        onChangeSelected: onChangeSelectedExt,
        onOpen: onOpenExt} = props

    let checkedItemsCounter = data.length
    const [state, dispatch] = useReducer(rootReducer, {...initialState,
        data: convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, trueWildcard, falseWildcard, selectAll: selectAllIni, filterValue: initialState.filterValue}),
        selectAll: selectAllIni,
        maxHeight, maxWidth, minWidth,
        checkedItemsCounter,
    })

    const {selectAll, filterValue, settingList, isOpened, reopen} = state

    const onClickSaveSettings = ((accessor) => () => {})(accessor)
    // auto close settings menu
    useEffect(() => {
        onClickSaveSettings()
    }, [settingList])

    const toggleOpenState = () => dispatch(switchOpenState())

    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        // console.log('change filter value', accessor, filterBy, currentType, selectAllState, filterValue)
        onChangeSelectedExt({accessor, value: filterValue, selectAll})
    }, [settingList, selectAll, filterValue])

    // for lazy updating filter list when is filter opened or we change type of filter in open state
    useEffect(() => {
        if (isOpened) {
            onOpenExt({accessor})
        }
    }, [isOpened])
    //update list of filter
    useEffect(() => {
        dispatch(updateDataList(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, trueWildcard, falseWildcard, selectAll, filterValue})))
    }, [data])

    //watch reopen signal (reopen === true), reset them and open filter
    useEffect(() => {
        if (reopen) {
            dispatch(reopenFilter())
        }
    }, [reopen])

    return (
        <DropdownContext.Provider value={{accessor, parentRef, state, showSelectAll, loadingState, dispatch,
            fontRatio, bdColor,
            maxWidth, minWidth,
            emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
            emptyListWildcard, loadingWildcard,
            toggleOpenState
        }}>
            {children}
        </DropdownContext.Provider>
    )
}
ContextProvider.propTypes = {
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.bool])),
    filterListLoading: PropTypes.bool,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    onClickItem: PropTypes.func,
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    bdColor: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
}
