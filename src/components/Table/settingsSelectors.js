import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import isEqual from 'lodash.isequal'
import {defaultColumnSettings, defaultTableSettings} from './defaultSettings'

const getColumnsProps = (state, props) => props.columns
const getTableProps = (state, props) => props.table

export const getColumnsSettings = createSelector(
    getColumnsProps,
    columns => columns.map(column => Object.assign(defaultColumnSettings(), column)).filter(column => column.isVisible)
)
export const getTableSettings = createSelector(
    getTableProps,
    tableProps => Object.assign(defaultTableSettings(), tableProps)
)

const getColumnsSizes = createSelector(
    getColumnsSettings,
    columns => columns.filter(column => column.isVisible).map(column => {
        const {minWidth, maxWidth} = column
        return {minWidth, maxWidth}
    })
)

//create a "selector creator" that uses lodash.isEqual
const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
)

export const calculateColumnsSizes = createDeepEqualSelector(
    (stateTableBoxSize, props) => stateTableBoxSize,
    getColumnsSizes,
    //function calculated visible columns sizes
    (tableBoxSizes, columnsSizes) => ({tableBoxSizes, columnsSizes})
)

// export const old_getTableSettings = (props) => {
//     const {columns = []} = props
//     const allColumnAccessors = (columns) => {
//         const notEmpty = []
//         columns.forEach(column => {
//             if (column.accessor && column.accessor.length && column.accessor.length > 0) notEmpty.push(column.accessor)
//         })
//         return notEmpty
//     }
//     return {
//         table: {
//             width: 100, //size of table in percents from parent
//             vBorder: 'none', // vertical border
//             hBorder: 'none', // horizontal border
//             globalFilter: true
//         },
//         columns: [],
//         globalFilter: {
//             filterBy: allColumnAccessors(columns),
//             operator: '=',
//             operatorsList: [{'=': '='}]
//         },
//         renderRow: () => {}
//     }
// }

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
