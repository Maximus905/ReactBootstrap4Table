import {createSelector, defaultMemoize} from 'reselect'
import isEqual from 'lodash.isequal'
import {defaultColumnSettings, defaultTableSettings} from './defaultSettings'

const getColumnsProps = (state, props) => props.columns

export const getColumnsSettings = createSelector(
    getColumnsProps,
    columns => columns.map(column => Object.assign(defaultColumnSettings(), column)).filter(column => column.isVisible)
)

const getColumnsSizes = createSelector(
    getColumnsSettings,
    columns => columns.filter(column => column.isVisible).map(column => {
        const {minWidth, maxWidth} = column
        return {minWidth, maxWidth}
    })
)

const getTableWidthProps = (state, props) => props.table.width

//write own equality check
const calculateColumnsSizes = createSelector


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
