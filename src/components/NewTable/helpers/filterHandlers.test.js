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

test('change filter type in filtersSettings', () => {
    const filtersSettings = getFiltersSettings()
    const res = getFiltersSettings()
    res['column1'].type = 'NE'
    const accessor = 'column1'
    expect(filtersSettings_ChangeFilterType({filtersSettings, accessor, type: ft.NE.value})).toEqual(res)
    res['column1'].type = 'LIST'
    expect(filtersSettings_ChangeFilterType({filtersSettings, accessor, type: ft.LIST.value})).toEqual(res)
})
test('change filter type in Filters', () => {
    // EQ -> NE
    const filters1 = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['val1', 'val2'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    let res = {
        column1: {
            filterBy: 'column1',
            type: ft.NE.value,
            value: [],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    // EQ -> LIST
    expect(filters_ChangeFilterType({filters: filters1, accessor: 'column1', type: ft.NE.value})).toEqual(res)
    res = {
        column1: {
            filterBy: 'column1',
            type: ft.LIST.value,
            value: [],
            didInvalidate: true
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    // EQ -> LIST empty filter value
    expect(filters_ChangeFilterType({filters: filters1, accessor: 'column1', type: ft.LIST.value})).toEqual(res)
    const filters2 = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: [],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }

    res = {
        column1: {
            filterBy: 'column1',
            type: ft.LIST.value,
            value: [],
            didInvalidate: true
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    expect(filters_ChangeFilterType({filters: filters2, accessor: 'column1', type: ft.LIST.value})).toEqual(res)
})
test('filters - set value', () => {
    const filters = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['val1', 'val2'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    let exp = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['test'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    const res = filters_setValue({filters, accessor: 'column1', value: 'test'})
    expect(res).toEqual(exp)
})
test('filters - set empty value', () => {
    const filters = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['initial'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    let exp = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: [],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    const res = filters_setValue({filters, accessor: 'column1', value: ''})
    expect(res).toEqual(exp)
})
test('filters - add value', () => {
    const filters = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: [],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    let exp = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['test'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    const res = filters_addValue({filters, accessor: 'column1', value: 'test'})
    expect(res).toEqual(exp)
    const filters2 = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['val1'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    let exp2 = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['val1', 'test'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    const res2 = filters_addValue({filters: filters2, accessor: 'column1', value: 'test'})
    expect(res2).toEqual(exp2)
})
test('filters - remove value', () => {
    const filters = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: [],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    const res = filters_removeValue({filters, accessor: 'column1', value: 'test'})
    expect(res).toEqual(filters)
    const filters2 = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: ['test'],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: false
        },
    }
    let exp2 = {
        column1: {
            filterBy: 'column1',
            type: ft.EQ.value,
            value: [],
            didInvalidate: false
        },
        column2: {
            filterBy: 'column2',
            type: ft.LIST.value,
            value: ['val3', 'val4'],
            didInvalidate: true
        },
    }
    const res2 = filters_removeValue({filters: filters2, accessor: 'column1', value: 'test'})
    expect(res2).toEqual(exp2)
})