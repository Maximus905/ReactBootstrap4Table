import React, {createContext, useEffect, useReducer} from "react"
import PropTypes, {oneOfType} from 'prop-types'
import {convertDataList} from "../helpers";
import rootReducer, {dispatchMiddleware} from "../reducer"
import {initialState} from "../constants/initialState"
import {
    changeMenuMaxHeight, switchOpenState, updateDataList,
    reopen
} from "../actions";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {accessor, children, data, selected, loadingState,
        maxHeight, maxWidth,minWidth, fontRatio, bdColor,
        emptyListWildcard, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, loadingWildcard,
        onChangeSelected: onChangeSelectedExt,
        onOpen: onOpenExt,
        onClose: onCloseExt
    } = props

    let checkedItemsCounter = data.length
    const [state, dispatch] = useReducer(rootReducer, {...initialState,
        data: convertDataList({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems: selected}),
        maxHeight, maxWidth, minWidth,
        checkedItemsCounter,
    })
    const asyncDispatch = dispatchMiddleware(dispatch)


    const {checkedItems, isOpened, reopen} = state

    const toggleOpenState = () => dispatch(switchOpenState())

    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        onChangeSelectedExt({accessor, value: checkedItems})
    }, [checkedItems])

    // for lazy updating filter list when is filter opened or we change type of filter in open state
    useEffect(() => {
        if (isOpened) {
            onOpenExt({accessor})
        } else {
            onCloseExt({accessor})
        }
    }, [isOpened])
    //update list of filter
    useEffect(() => {
        dispatch(updateDataList(convertDataList({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})))
    }, [data])

    //watch reopen signal (reopen === true), reset them and open filter
    useEffect(() => {
        if (reopen) {
            dispatch(reopen())
        }
    }, [reopen])

    return (
        <DropdownContext.Provider value={{accessor, state, loadingState, dispatch,
            fontRatio, bdColor,
            maxWidth, minWidth,
            emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard,
            emptyListWildcard, loadingWildcard,
            toggleOpenState
        }}>
            {children}
        </DropdownContext.Provider>
    )
}
ContextProvider.propTypes = {
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.bool])),
    loadingState: PropTypes.bool,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    onClickItem: PropTypes.func,
    fontRatio: PropTypes.number,

    emptyWildcard: PropTypes.string,
    emptyValueWildcard: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    trueWildcard: PropTypes.string,
    falseWildcard: PropTypes.string,

    bdColor: PropTypes.string,
}
