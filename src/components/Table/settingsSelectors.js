import {createSelector, defaultMemoize} from 'reselect'
import isEqual from 'lodash.isequal'
import {defaultColumnSettingsProps, defaultTableSettingsProps} from './defaultSettings'

const columnsPreSelector = (props) => props.columns

export const columnsSettingsSelector = createSelector(
    columnsPreSelector,
    columns => columns.map(column => Object.assign(defaultColumnSettingsProps(), column)).filter(column => column.isVisible)
)

const columnSizesPreSelector = createSelector(
    columnsSettingsSelector,
    columns => columns.filter(column => column.isVisible).map(column => {
        const {minWidth, maxWidth} = column
        return {minWidth, maxWidth}
    })
)


export const getTableSettings = (props) => {
    const {columns = []} = props
    const allColumnAccessors = (columns) => {
        const notEmpty = []
        columns.forEach(column => {
            if (column.accessor && column.accessor.length && column.accessor.length > 0) notEmpty.push(column.accessor)
        })
        return notEmpty
    }
    return {
        table: {
            width: 100, //size of table in percents from parent
            vBorder: 'none', // vertical border
            hBorder: 'none', // horizontal border
            globalFilter: true
        },
        columns: [],
        globalFilter: {
            filterBy: allColumnAccessors(columns),
            operator: '=',
            operatorsList: [{'=': '='}]
        },
        renderRow: () => {}
    }
}

export const getColumnSettings = (props) => {
    return {
        title: '',
        accessor: '',
        minWidth: 0,
        maxWidth: 0,
        isVisible: true,
        filterable: false,
        filter: {
            filterBy: [],
            operator: '=',
            operatorsList: ['=']
        },
        renderCell: () => {}
    }
}
