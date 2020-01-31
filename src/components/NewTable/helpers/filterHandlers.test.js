import ft from "../constatnts/filterTypes"
import {
    filtersSettings_ChangeFilterType,
    filters_ChangeFilterType,
    filters_setValue, filters_addValue, filters_removeValue
} from './filterHandlers'

const getFiltersSettings = () => ({
    column1: {
        filterBy: 'column1',
        type: ft.EQ.value,
        allowedTypes: [ft.EQ.value, ft.LIST.value]
    },
    column2: {
        filterBy: 'column2',
        type: ft.LIST.value,
        allowedTypes: [ft.EQ.value, ft.LIST.value]
    },
})
const getFilterSettings = (filterBy, type, allowedTypes) => ({filterBy, type, allowedTypes})
const getTextFilterState = (filterBy, type, value, didInvalidate) => ({filterBy, type, value, didInvalidate})
const getListFilterState = (filterBy, type, selectAllState, value, list, didInvalidate) => ({filterBy, type, selectAllState, value, list, didInvalidate})

test('change filter type in filtersSettings EQ -> NE', () => {
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    let res = {
        c1: getFilterSettings('c1', 'NE', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    const accessor = 'c1'
    expect(filtersSettings_ChangeFilterType({filtersSettings, accessor, type: ft.NE.value})).toEqual(res)
})
test('change filter type in filtersSettings EQ -> LIST', () => {
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    const accessor = 'c1'
    const res = {
        c1: getFilterSettings('c1', 'LIST', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    expect(filtersSettings_ChangeFilterType({filtersSettings, accessor, type: ft.LIST.value})).toEqual(res)
})
test('change filter type in Filters EQ -> NE. Not empty value in EQ', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'NE', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_ChangeFilterType({filters: filters, accessor: 'c1', type: ft.NE.value})).toEqual(result)
})
test('change filter type in Filters EQ -> NE. Empty value in EQ', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'NE', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    expect(filters_ChangeFilterType({filters: filters, accessor: 'c1', type: ft.NE.value})).toEqual(result)
})
test('change filter type in Filters EQ -> LIST. Not empty value in EQ', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true,[], [], true),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_ChangeFilterType({filters: filters, accessor: 'c1', type: ft.LIST.value})).toEqual(result)
})
test('filters - set value for EQ filter', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'EQ', ['newValue'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }

    const res = filters_setValue({filters, accessor: 'c1', value: 'newValue'})
    expect(res).toEqual(result)
})
test('filters - set value for LIST filter', () => {
    let filters = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true, ['newValue'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }

    const res = filters_setValue({filters, accessor: 'c1', value: 'newValue'})
    expect(res).toEqual(result)
})
test('filters - set empty value for EQ filter', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }

    const res = filters_setValue({filters, accessor: 'c1', value: ''})
    expect(res).toEqual(result)
})
test('filters - set empty value for LIST filter', () => {
    let filters = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true, [], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }

    const res = filters_setValue({filters, accessor: 'c1', value: ''})
    expect(res).toEqual(result)
})
test('filters - add value to EQ. Initial value is not empty', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2', 'v3'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_addValue({filters, accessor: 'c1', value: 'v3'})).toEqual(result)
})
test('filters - add value to EQ. Initial value is empty', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'EQ', ['v3'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_addValue({filters, accessor: 'c1', value: 'v3'})).toEqual(result)
})
test('filters - add value to LIST. Initial value is not empty', () => {
    let filters = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2', 'v3'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_addValue({filters, accessor: 'c1', value: 'v3'})).toEqual(result)
})
test('filters - add value to LIST. Initial value is empty', () => {
    let filters = {
        c1: getListFilterState('c1', 'LIST', true, [], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true, ['v3'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_addValue({filters, accessor: 'c1', value: 'v3'})).toEqual(result)
})
test('filters - remove value from LIST filter', () => {
    let filters = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2', 'v3'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v3'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_removeValue({filters, accessor: 'c1', value: 'v2'})).toEqual(result)
})