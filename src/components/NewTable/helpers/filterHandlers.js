import filterTypes from "../constatnts/filterTypes";
import {emptyListFilterTemplate, emptyTextFilterTemplate} from "../constatnts/initial";
import {INVALIDATE_FILTER_LIST} from "../constatnts/actions";
import {
    TIMEOUT_CHANGE_FILTER_TYPE,
    TIMEOUT_CHANGE_LIST_FILTER_VALUE,
    TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE
} from "../constatnts/timeouts";

export const filtersSettings_changeFilterType = ({filtersSettings, accessor, type}) => ({...filtersSettings, [accessor]: {...filtersSettings[accessor], type}})
const oneFilter_changeFilterType = ({filter, type, value}) => (
    (type === filterTypes.LIST.value) ? ({
        ...emptyListFilterTemplate,
        filterBy: filter.filterBy,
        type,
        value,
        didInvalidate:  !!filterTypes[type].loadFromServer
    }) : ({
        ...emptyTextFilterTemplate,
        filterBy: filter.filterBy,
        type,
        value,
        didInvalidate:  !!filterTypes[type].loadFromServer
    })
)
export const filters_changeFilterType = ({filters, accessor, type}) => {
    const currentValue = filters[accessor].value
    const isCurrentValueEmpty = !currentValue.length
    return Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ?
            oneFilter_changeFilterType({type, filter, value: isCurrentValueEmpty ? currentValue : []}) :
            (filterTypes[filter.type].loadFromServer && !isCurrentValueEmpty ? {...filter, didInvalidate: true} : filter)
        return res
    }, {})
}
export const filters_changeValue = ({filters, accessor, value, selectAllState}) => {
    const filterType = filters[accessor].type
    if (filterType === filterTypes.LIST.value) {
        return Object.entries(filters).reduce((res, [key, filter]) => {
            res[key] = key === accessor ? {
                ...filter,
                value,
                selectAllState
            } : (
                filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
            )
            return res
        }, {})
    } else {
        return Object.entries(filters).reduce((res, [key, filter]) => {
            res[key] = key === accessor ? {
                ...filter,
                value,
            } : (
                filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
            )
            return res
        }, {})
    }

}
export const app_changeFilter = ({state, accessor, type, value, selectAllState}) => {
    const currentFilter = state.filters[accessor]
    const typeIsChanged = currentFilter.type !== type
    const isCurrentValueEmpty = currentFilter.type === filterTypes.LIST.value ? (!currentFilter.value.length && selectAllState) : !currentFilter.value.length
    console.log('app_changeFilter',currentFilter.type, accessor, type, value, selectAllState)

    const newState = {}
    if (typeIsChanged) {
        newState.filtersSettings = filtersSettings_changeFilterType({filtersSettings: state.filtersSettings, type, accessor})
        newState.filters = filters_changeFilterType({filters: state.filters, accessor, type})
        if (!isCurrentValueEmpty) newState.invalidateWithDelay = TIMEOUT_CHANGE_FILTER_TYPE
    } else {
        console.log('app_changeFilter',currentFilter.value, currentFilter.value === value, currentFilter.selectAllState = selectAllState)
        newState.filters = filters_changeValue({filters: state.filters, accessor, value, selectAllState})
        newState.invalidateWithDelay = type === filterTypes.LIST.value ? TIMEOUT_CHANGE_LIST_FILTER_VALUE : TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE
    }
    return newState
}
// export const changeFilter_invalidateData = ({state, accessor, type, value, selectAllState}) => {
//     const currentFilter = state.filters[accessor]
//     const typeIsChanged = currentFilter.type !== type
//     const currentValue = currentFilter.value
//     const isCurrentValueEmpty = !currentFilter.value.length
//     return typeIsChanged ?
//         !isCurrentValueEmpty :
//         ((currentValue !== value) || ((currentFilter.selectAllState !== undefined) && (currentFilter.selectAllState !== selectAllState)))
// }
// export const filters_addValue = ({filters, accessor, value}) => {
//     if (filters[accessor].value.includes(value)) return filters
//     return Object.entries(filters).reduce((res, [key, filter]) => {
//         res[key] = key === accessor ? {
//             ...filter,
//             value: [...filter.value, value]
//         } : (
//             filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
//         )
//         return res
//     }, {})
// }
//
// export const filters_removeValue = ({filters, accessor, value, appendMode = false}) => {
//     const itemIndex = filters[accessor].value.indexOf(value)
//     if (itemIndex < 0) return filters
//     const newValue = filters[accessor].value.filter(item => item !== value)
//     return Object.entries(filters).reduce((res, [key, filter]) => {
//         res[key] = key === accessor ? {
//             ...filter,
//             value: newValue
//         } : (
//             filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
//         )
//         return res
//     }, {})
// }
// export const filters_selectAll = ({filters, accessor}) => {
//     return filters
// }
// export const filters_selectNone = ({filters, accessor}) => {
//     return filters
// }