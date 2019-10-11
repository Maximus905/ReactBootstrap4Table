import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import isEqual from 'lodash.isequal'
import {defaultColumnSettings, defaultTableSettings} from './defaultSettings'
import {calculateColumnsSizes} from './auxiliaryFunctions'

// pre-selector: get columns settings from props
const getColumnsProps = (stateTableBoxSizes, stateScrollsSizes, props) => props.columns
//merge default settings for each column and filter only visible
const getVisibleColumnsPropsSettings = createSelector(
    getColumnsProps,
    columns => columns.map(column => Object.assign(defaultColumnSettings(column), column)).filter(column => column.isVisible)
)
//return only size props of columns
/**
 *
 */
const getVisibleColumnsSizesSettings = createSelector(
    getVisibleColumnsPropsSettings,
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

export const calculateVisibleColumnsSizes = createDeepEqualSelector(
    (stateTableBoxSize, stateScrollsSizes, props) => stateTableBoxSize === undefined ? 0 : stateTableBoxSize.width,
    (stateTableBoxSize, stateScrollsSizes, props) => stateScrollsSizes,
    getVisibleColumnsSizesSettings,
    // (stateTableBoxSize, props, stateScrollsSizes) => stateScrollsSizes,
    // call function calculated visible columns sizes
    (tableBoxWidth, scrollsSizes, columnsSizesSettings) => calculateColumnsSizes(tableBoxWidth, scrollsSizes, columnsSizesSettings)
)

export const getVisibleColumnsSettings = createSelector(
    getVisibleColumnsPropsSettings,
    calculateVisibleColumnsSizes,
    (columnsProps, columnsSizes) =>  columnsProps.map((column, index) => Object.assign(column, {width: columnsSizes[index].width}))
)

const getTableProps = (stateTableBoxSizes, stateScrollsSizes, props) => props.table

export const getTableSettings = createSelector(
    getTableProps,
    calculateVisibleColumnsSizes,
    (tableProps, columnsSizes) => {
        const mergedProps = Object.assign(defaultTableSettings(), tableProps)
        mergedProps.widthPx = columnsSizes.reduce((sumWidth, column) => sumWidth + column.width, 0)
        return mergedProps
    }
)


// TODO create global filter selector

