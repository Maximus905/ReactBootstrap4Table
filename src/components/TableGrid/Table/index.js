import React, {Fragment, useRef, useContext, useEffect, useState} from 'react'
import {TableGridContext} from '../TableGridProvider'
import {requestData, invalidateData} from '../actions'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './style.module.css'
import ScrollbarSize from "react-scrollbar-size"
import {useEvent} from '../../Hooks'
import {defaultTableSettings, defaultColumnSettings} from './defaultSettings'
import {calculateColumnsSizes} from './helpers'

function Table(props) {
    const [tableBoxSizes, setTableBoxSizes] = useState({width: 0, height: 0})
    const [scrollsSizes, setScrollsSize] = useState({x: 0, y: 0})
    const [columnsSizes, setColumnsSizes] = useState([])
    useEvent('resize', onResizeHandler)
    //after mounting table invoke onResize handler once to set up table size
    useEffect(() => onResizeHandler(), [])

    const refTableBox = useRef(null)
    // destruct data from context
    const {state, dispatch, getTableData, table, columns} = useContext(TableGridContext)

    const {isLoading ,didInvalidate} = state
    // reload data table according to isLoading and didInvalidate
    useEffect(() => {
        if (!isLoading && didInvalidate) {
            console.log('start fetching data')
            const action = requestData({fetchFunction: getTableData, filter: 'test'})
            console.log('data is fetched ')
            dispatch(action)
        }
    }, [isLoading, didInvalidate, dispatch, getTableData])
    //function for updating data in table
    function updateData() {
        return dispatch(invalidateData())
    }
    window.test = updateData
    //calculate table and columns settings and sizes
    // TODO: rewrite to using useMemo hook
    const visibleColumns = columns.map(column => Object.assign(defaultColumnSettings(column), column)).filter(column => column.isVisible)
    const visibleColumnsSizesSettings = visibleColumns.filter(column => column.isVisible).map(column => ({
        minWidth: column.minWidth,
        maxWidth: column.maxWidth
    }))
    const calculatedVisibleColumnsSizes = calculateColumnsSizes(tableBoxSizes.width, scrollsSizes, visibleColumnsSizesSettings)
    const visibleColumnsSettings = ((columnsSettings, columnsSizes) => columnsSettings.map((column, index) => Object.assign(column, {width: columnsSizes[index].width})))(visibleColumns, calculatedVisibleColumnsSizes)

    const tableSettings = Object.assign(defaultTableSettings(), table, {widthPx: calculatedVisibleColumnsSizes.reduce((sumWidth, column) => sumWidth + column.width, 0)})
    const {tableSmall, tableStriped, tableDark, tableBordered, tableBorderless, tableHover} = tableSettings
    // CSS style objects for table
    const tableSizeCss = {
        width: `${tableSettings.widthPx}px`
    }
    const tableHdBoxSizeCss = {
        width: `${tableSettings.widthPx + scrollsSizes.x}px`
    }
    const tableBdBoxSizeCss = {
        width: `${tableSettings.widthPx + scrollsSizes.x}px`
    }
    const getTableFooterWidth = () => {
        if (tableBoxSizes && tableBoxSizes.width) {
            return tableBoxSizes.width > (tableSettings.widthPx + scrollsSizes.x) ? tableSettings.widthPx + scrollsSizes.x : tableBoxSizes.width
        } else {
            return tableSettings.widthPx + scrollsSizes.x
        }
    }
    const tableFtBoxSizeCss = {
        width:  `${getTableFooterWidth()}px`
    }

    return (
        <Fragment>
            <div className={classNames(css.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox}>
                <div className={classNames(css.tHdBdBox, "d-flex", "flex-column", "flex-grow-1")}>
                    <div className={classNames(css.tHdBox, "bg-light")} style={tableHdBoxSizeCss}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless}, css.fixTableSizes)} style={tableSizeCss}>
                            <thead>
                            {tableSettings.renderHeaderRow(tableSettings, visibleColumnsSettings, scrollsSizes)}
                            </thead>
                        </table>
                    </div>
                    <div className={classNames(css.tBdBox, "bg-light", "flex-grow-1")} style={tableBdBoxSizeCss}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-striped": tableStriped, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless, "table-hover": tableHover }, css.fixTableSizes)} style={tableSizeCss}>
                            <thead className={css.hiddenHeader}>

                            {tableSettings.renderHeaderRow(tableSettings, visibleColumnsSettings, updateData)}
                            </thead>
                            <tbody>
                            {state.data.map((rowData, index) => {
                                return tableSettings.renderRow({rowData, rowIndex: index, columnsSettings: visibleColumnsSettings, updateData})
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classNames("bg-warning")} style={tableFtBoxSizeCss}>Table Footer</div>
            </div>
            <ScrollbarSize onLoad={(measurements) => setScrollsSize({x: measurements.scrollbarHeight, y: measurements.scrollbarWidth})}/>
        </Fragment>
    )

    function onResizeHandler() {
        setTableBoxSizes({width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight})
    }
}



export default Table