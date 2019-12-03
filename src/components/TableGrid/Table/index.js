import React, {Fragment, useRef, useContext, useEffect, useState, createContext} from 'react'
import {TableGridContext} from '../TableGridProvider'
import TableContextProvider from '../TableContext'
import {requestData, invalidateData, addSorting, setSorting, ctrlDown, ctrlUp} from '../actions'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './style.module.css'
import ScrollbarSize from "react-scrollbar-size"
import {useEvent} from '../../Hooks'
import {defaultTableSettings, defaultColumnSettings} from './defaultSettings'
import {calculateColumnsSizes} from './helpers'
import HeaderRow from '../HeaderRow'
import HeaderCell from '../HeaderCell'
import SimpleHeaderCell from '../SimpleHeaderCell'
import ScrollCell from '../ScrollCell'
import BodyRow from '../BodyRow'
import BodyCell from "../BodyCell";

function Table(props) {
    const [tableBoxSizes, setTableBoxSizes] = useState({width: 0, height: 0, bodyWidth: 0, bodyHeight: 0})
    const [scrollsSizes, setScrollsSize] = useState({x: 0, y: 0})
    const [columnsSizes, setColumnsSizes] = useState([])
    useEvent('resize', onResizeHandler)
    //after mounting table invoke onResize handler once to set up table size
    useEffect(() => onResizeHandler(), [])

    const refTableBox = useRef(null)
    const refTableBodyBox = useRef(null)
    // destruct data from context
    const {state, state: {sorting}, dispatch, getTableData, table, columns, custom} = useContext(TableGridContext)

    const {isLoading ,didInvalidate, isCtrlPressed} = state
    // reload data table according to isLoading and didInvalidate
    useEffect(() => {
        if (!isLoading && didInvalidate && !isCtrlPressed) {
            console.log('start fetching data')
            const action = requestData({fetchFunction: getTableData, filter: 'test', sorting})
            console.log('data is fetched ')
            dispatch(action)
        }
    }, [isLoading, didInvalidate, dispatch, getTableData, sorting, isCtrlPressed])
    //function for updating data in table
    function updateData() {
        return dispatch(invalidateData())
    }
    function addSortAccessor(accessor) {
        return dispatch(addSorting(accessor))
    }
    function setSortAccessor(accessor) {
        return dispatch(setSorting(accessor))
    }
    function ctrlDownHandler(e) {
        if (!isCtrlPressed) {
            console.log('ctrl down', e.ctrlKey)
            return dispatch(ctrlDown())
        }

    }
    function ctrlUpHandler(e) {
        if (isCtrlPressed) {
            console.log('ctrl up', e.ctrlKey)
            return dispatch(ctrlUp())
        }

    }
    // window.updateData = updateData
    // window.addSort = addSortAccessor
    // window.setSort = setSortAccessor
    //calculate table and columns settings and sizes
    // TODO: rewrite to using useMemo hook
    const columnsSettings = columns.map(column => Object.assign(defaultColumnSettings(column), column))
    const visibleColumns = columnsSettings.filter(column => column.isVisible)
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
    const tableContext = {
        sorting,
        tableBoxSizes,
        tableSettings,
        columnsSettings,
        visibleColumnsSettings,
        scrollsSizes,
        custom,
        updateData,
        addSortAccessor,
        setSortAccessor
    }

    return (
        <Fragment>
            <TableContextProvider {...tableContext}>
                <div className={classNames(css.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox} onKeyDown={ctrlDownHandler} onKeyUp={ctrlUpHandler} tabIndex="0">
                    <div className={classNames(css.tHdBdBox, "d-flex", "flex-column", "flex-grow-1")}>
                        <div className={classNames(css.tHdBox, "bg-light")} style={tableHdBoxSizeCss}>
                            <table className={classNames("table", {"table-sm": tableSmall, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless}, css.fixTableSizes)} style={tableSizeCss}>
                                <thead>
                                    <HeaderRow>
                                        {visibleColumnsSettings.map((columnSettings, index) => (<HeaderCell key={index} {...{columnSettings}} />))}
                                        <ScrollCell scrollsSizes={scrollsSizes} />
                                    </HeaderRow>
                                </thead>
                            </table>
                        </div>
                        <div className={classNames(css.tBdBox, "bg-light", "flex-grow-1")} style={tableBdBoxSizeCss} ref={refTableBodyBox}>
                            <table className={classNames("table", {"table-sm": tableSmall, "table-striped": tableStriped, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless, "table-hover": tableHover }, css.fixTableSizes)} style={tableSizeCss}>
                                <thead className={css.hiddenHeader}>
                                <HeaderRow>
                                    {visibleColumnsSettings.map((columnSettings, index) => (<SimpleHeaderCell key={index} {...{columnSettings}}  />))}
                                </HeaderRow>
                                </thead>
                                <tbody>
                                {state.data.map((rowData, index) => {
                                    return (
                                        <BodyRow key={index} rowData={rowData}>
                                            {visibleColumnsSettings.map((columnSettings, index) => {
                                                const {accessor} = columnSettings
                                                return <BodyCell key={index} {...{rowData, accessor, columnSettings}} />
                                            })}
                                        </BodyRow>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={classNames("bg-warning")} style={tableFtBoxSizeCss}>Table Footer</div>
                </div>
                <ScrollbarSize onLoad={(measurements) => setScrollsSize({x: measurements.scrollbarHeight, y: measurements.scrollbarWidth})}/>
            </TableContextProvider>
        </Fragment>
    )
    function onResizeHandler() {
        setTableBoxSizes({
            width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight,
            bodyWidth: refTableBodyBox.current.clientWidth, bodyHeight: refTableBodyBox.current.clientHeight
        })
    }
}

export default Table