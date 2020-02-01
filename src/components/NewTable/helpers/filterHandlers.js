import filterTypes from "../constatnts/filterTypes";
import {emptyListFilterTemplate, emptyTextFilterTemplate} from "../constatnts/initial";

export const filtersSettings_ChangeFilterType = ({filtersSettings, accessor, type}) => ({...filtersSettings, [accessor]: {...filtersSettings[accessor], type}})
const filter_updateFilterType = ({type, filter}) => (
    (type === filterTypes.LIST.value) ? ({
        ...emptyListFilterTemplate,
        filterBy: filter.filterBy,
        type,
        value: [],
        didInvalidate:  !!filterTypes[type].loadFromServer
    }) : ({
        ...emptyTextFilterTemplate,
        filterBy: filter.filterBy,
        type,
        value: [],
        didInvalidate:  !!filterTypes[type].loadFromServer
    })
)
export const filters_ChangeFilterType = ({filters, accessor, type}) => {
    const isValueEmpty = !filters[accessor].value.length
    return Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ? filter_updateFilterType({type, filter}) : (
            filterTypes[filter.type].loadFromServer && !isValueEmpty ? {...filter, didInvalidate: true} : filter
        )
        return res
    }, {})
}
export const filters_setValue = ({filters, accessor, value}) => (
    Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ? {
            ...filter,
            value: value ? [value] : []
        } : (
            filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
        )
        return res
    }, {})
)
export const filters_changeFilter = ({filters, accessor, filterBy, type, value, selectAllState}) => {
    const current = filters[accessor]
    const isValueEmpty = !filters[accessor].value.length
    if (current.type !== type) {
        return filters_ChangeFilterType({filters, accessor, type})
    } else {

    }
}
export const filters_addValue = ({filters, accessor, value}) => {
    if (filters[accessor].value.includes(value)) return filters
    return Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ? {
            ...filter,
            value: [...filter.value, value]
        } : (
            filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
        )
        return res
    }, {})
}

export const filters_removeValue = ({filters, accessor, value, appendMode = false}) => {
    const itemIndex = filters[accessor].value.indexOf(value)
    if (itemIndex < 0) return filters
    const newValue = filters[accessor].value.filter(item => item !== value)
    return Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ? {
            ...filter,
            value: newValue
        } : (
            filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
        )
        return res
    }, {})
}
export const filters_selectAll = ({filters, accessor}) => {
    return filters
}
export const filters_selectNone = ({filters, accessor}) => {
    return filters
}