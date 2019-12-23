import React, {Fragment, useRef, useContext, useEffect, useState} from 'react'
import {TableGridContext} from '../TableGridProvider'
import TableContextProvider from '../TableContext'
import {requestData, invalidateData, addSorting, setSorting, ctrlDown, ctrlUp} from '../actions'
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
import {setFilterType} from "../actions";

function Table(props) {
    const [tableBoxSizes, setTableBoxSizes] = useState({width: 0, height: 0, bodyWidth: 0, bodyHeight: 0})
    const [scrollsSizes, setScrollsSize] = useState({x: 0, y: 0})
    useEvent('resize', onResizeHandler)
    //after mounting table invoke onResize handler once to set up table size
    useEffect(() => onResizeHandler(), [])

    const refTableBox = useRef(null)
    const refTableBodyBox = useRef(null)
    // destruct data from context
    const {state, state: {sorting}, dispatch, getTableData, table, columns, custom} = useContext(TableGridContext)
    console.log('TableGridContext state', state)
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
        if (!isCtrlPressed && e.ctrlKey) {
            console.log('ctrlDownHandler', e.ctrlKey)
            return dispatch(ctrlDown())
        }

    }
    function ctrlUpHandler(e) {
        if (isCtrlPressed && !e.ctrlKey) {
            console.log('ctrlUpHandler', e.ctrlKey)
            return dispatch(ctrlUp())
        }

    }
    const addSizesToSettings = (columnsSettings, columnsSizes) => columnsSettings.map((column, index) => {
        const {filter, ...restSettings} = column
        return Object.assign(restSettings, {width: columnsSizes[index].width})
    })
    /**
     *
     * @param {ColumnShape} columnsSettings
     * @return {Object.<string, ColumnFilterSettings>}
     */
    const getFiltersSettings = (columnsSettings) => columnsSettings.reduce((acc, column) => column.filterable ? {...acc, [column.accessor]: column.filter} : acc, {})

    //calculate table and columns settings and sizes
    // TODO: rewrite to using useMemo hook
    const columnsSettings = columns.map(column => {
        const defaultSet =  defaultColumnSettings(column)
        const filter = column.filter ? {...defaultSet.filter, ...column.filter} : defaultSet.filter
        return {...defaultSet, ...column, filter}
    })
    const visibleColumns = columnsSettings.filter(column => column.isVisible)
    const visibleColumnsSizesSettings = visibleColumns.filter(column => column.isVisible).map(column => ({
        minWidth: column.minWidth,
        maxWidth: column.maxWidth
    }))
    const calculatedVisibleColumnsSizes = calculateColumnsSizes(tableBoxSizes.width, scrollsSizes, visibleColumnsSizesSettings)

    const visibleColumnsSettings = addSizesToSettings(visibleColumns, calculatedVisibleColumnsSizes)

    const [visibleFiltersSettings, setVisibleFiltersSettings] = useState(getFiltersSettings(visibleColumns))
    //TODO visibleFilterSettings for filters with LIST type should be changed by setting didInvalidate: true for reloading list of values
    console.log('visibleFiltersSettings', visibleFiltersSettings)
    const changeColumnFilterType = (accessor, newType) => {
        console.log('changeColumnSettings', accessor, newType)
        setVisibleFiltersSettings({...visibleFiltersSettings, [accessor]: {...visibleFiltersSettings[accessor], type: newType}})
        dispatch(setFilterType({accessor, type: newType}))
    }

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
        visibleFiltersSettings,
        scrollsSizes,
        custom,
        updateData,
        addSortAccessor,
        setSortAccessor,
        changeColumnFilterType
    }

    return (
        <Fragment>
            <TableContextProvider {...tableContext}>
                <div className={classNames(css.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox} onKeyDown={ctrlDownHandler} onKeyUp={ctrlUpHandler} tabIndex="-1">
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