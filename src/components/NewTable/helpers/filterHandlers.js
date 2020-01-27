import filterTypes from "../constatnts/filterTypes";

export const filtersSettings_ChangeFilterType = ({filtersSettings, accessor, type}) => ({...filtersSettings, [accessor]: {...filtersSettings[accessor], type}})
export const filters_ChangeFilterType = ({filters, accessor, type}) => {
    const isValueEmpty = !filters[accessor].value.length
    return Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ? {
            ...filter,
            type,
            value: [],
            didInvalidate: !!filterTypes[type].loadFromServer
        } : (
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