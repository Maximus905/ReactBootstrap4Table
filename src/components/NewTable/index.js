/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import React, {useReducer, useRef, useEffect, useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'
import myCss from './style.module.css'
//actions
import {setScrollSizes, pageResizing, tableResizing, invalidateData} from "./actions";
//components
import HeaderRow from "./components/HeaderRow"
import HeaderCell from "./components/HeaderCell";
import ScrollCell from "./components/ScrollCell"
import Spinner from "./components/Spiner";
import Row from "./components/Row";

import {filterType} from "../TableGrid/constants/filters"
import {useEvent} from "../Hooks"
import {rootReducer, dispatchMiddleware} from "./reducer"
import {
    iniReducerState
} from './helpers'
import TableContext from "./TableContext"
import {requestData, ctrlDown, ctrlUp} from "./actions";
import classNames from "classnames";
import ScrollbarSize from "react-scrollbar-size";
import Cell from "./components/Cell";
import SimpleHeaderCell from "./components/SimpleHeaderCell";

const NewTable = props => {
    const {getTableData, table, getFilterList, filterLabelName, filterValueName, filterCheckedName } = props
    const {renderHeaderRow, renderRow, renderHeaderCell, renderCell} = table || {}
    const [state, dispatch] = useReducer(rootReducer, props, iniReducerState)
    const asyncDispatch = dispatchMiddleware(dispatch)
    const {isLoading, didInvalidate, sorting, filters, isCtrlPressed,
        tableSettings: {tableSmall, tableStriped, tableDark, tableBordered, tableBorderless, tableHover},
        dimensions,
        dimensions: {tWidth, vScroll, tBoxWidth},
        columnsSettings, visibleColumnsOrder,
    } = state
    console.log('data', state.filters['column1'], state.filters['column2'], isLoading, didInvalidate)
    useEvent('resize', onResizeHandler)
    const refTableBox = useRef(null)
    const refTableBodyBox = useRef(null)
    useEffect(() => onResizeHandler(), [])
    useEffect(() => {
        dispatch(tableResizing())
    }, [tBoxWidth, vScroll, props.columns])
    function onResizeHandler() {
        dispatch(pageResizing({
            tBoxWidth: refTableBox.current.clientWidth,
            tBoxHeight: refTableBox.current.clientHeight,
            tBodyBoxWidth: refTableBodyBox.current.clientWidth,
            tBodyBoxHeight: refTableBodyBox.current.clientHeight,
        }))
    }
    // reload data table according to isLoading and didInvalidate
    useEffect(() => {
        console.log('effect', isLoading, didInvalidate)
        if (!isLoading && didInvalidate && !isCtrlPressed) {
            console.log('start fetching data', filters , sorting)
            // const action = requestData({fetchFunction: getTableData, filters: {}, sorting})
            const action = requestData({fetchFunction: getTableData, filters , sorting})
            asyncDispatch(action)
            console.log('data is fetched ')
        }
    }, [isLoading, didInvalidate, dispatch, getTableData, isCtrlPressed])
    useEffect(() => {
        console.log('useEffect on filters changing', filters)
    }, [filters]);
    // invalidate data with timeout
    const timeIdRef = useRef(null)
    const handlerInvalidate = () => dispatch(invalidateData())
    const invalidateDataWithTimeout = (delay) => {
        if (timeIdRef.current) {
            clearTimeout(timeIdRef.current)
        }
        if (delay) {
            timeIdRef.current = setTimeout(handlerInvalidate, delay)
        } else {
            timeIdRef.current = null
            invalidateData()
        }
    }
    // Ctrl key handlers
    function ctrlDownHandler(e) {
        if (!isCtrlPressed && e.ctrlKey) {
            console.log('ctrlDownHandler', e.ctrlKey)
            const res = dispatch(ctrlDown())
            console.log('ctrl result', res)
            return res
        }

    }
    function ctrlUpHandler(e) {
        if (isCtrlPressed && !e.ctrlKey) {
            console.log('ctrlUpHandler', e.ctrlKey)
            return dispatch(ctrlUp())
        }
    }
    // filters list handle

    const context = {
        state,
        dispatch: asyncDispatch,
        invalidateDataWithTimeout,
        getTableData,
        getFilterList,
        renderHeaderRow,
        renderHeaderCell,
        renderRow,
        renderCell,
        filterLabelName,
        filterValueName,
        filterCheckedName,
    }
    // const sorter = (accessor) => (<Sorter accessor={accessor} />)
    return (
        <TableContext.Provider value={context}>
            <div className={classNames(myCss.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox} onKeyDown={ctrlDownHandler} onKeyUp={ctrlUpHandler} tabIndex="-1">
                <div className={classNames(myCss.tHdBdBox, isLoading ? myCss.noScroll : '', "d-flex", "flex-column", "flex-grow-1", "position-relative")}>
                    <div className={classNames(myCss.tHdBox, "bg-light")} css={css`width: ${tWidth + vScroll}px`}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless}, myCss.fixTableSizes)} css={css`width: ${tWidth}px`}>
                            <thead>
                                <HeaderRow renderHeaderRow={renderHeaderRow} >
                                    {visibleColumnsOrder.map((accessor, index) => <HeaderCell accessor={accessor} key={index} />)}
                                    <ScrollCell vScroll={vScroll} />
                                </HeaderRow>
                            </thead>
                        </table>
                    </div>
                    <div className={classNames(myCss.tBdBox, isLoading ? myCss.noScroll : '', "bg-light", "flex-grow-1")} css={css`width: ${tWidth + vScroll}px;`} ref={refTableBodyBox}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-striped": tableStriped, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless, "table-hover": tableHover }, myCss.fixTableSizes)} css={css`width: ${tWidth}px`}>
                            <thead className={myCss.hiddenHeader}>
                            <HeaderRow>
                                {visibleColumnsOrder.map((accessor, index) => <SimpleHeaderCell accessor={accessor} key={index} />)}
                            </HeaderRow>
                            </thead>
                            <tbody>
                            {state.data.map((rowData, index) => (
                                <Row key={index} rowData={rowData} index={index}>
                                    {visibleColumnsOrder.map((accessor, index) => <Cell accessor={accessor} rowData={rowData} key={index} />)}
                                </Row>
                            ))}
                            </tbody>
                        </table>
                        {isLoading ? <Spinner/> : null}
                    </div>
                </div>
                {/*<div className={classNames("bg-warning")} style={tableFtBoxSizeCss}>Table Footer</div>*/}
            </div>
            <ScrollbarSize onLoad={(measurements) => dispatch(setScrollSizes({vScroll: measurements.scrollbarWidth, hScroll: measurements.scrollbarHeight}))}/>
        </TableContext.Provider>
    )
}
NewTable.propTypes = {
    table: PropTypes.shape({
        width: PropTypes.number, //width of table (% from tBox)
        //bs styles for table
        tableSmall: PropTypes.bool,
        tableStriped: PropTypes.bool,
        tableDark: PropTypes.bool,
        tableBordered: PropTypes.bool,
        tableBorderless: PropTypes.bool,
        tableHover: PropTypes.bool,
        //
        globalFilter: PropTypes.bool,
        renderRow: PropTypes.func, // function for rendering row in Body of table
        renderHeaderRow: PropTypes.func, // function for rendering row in a visible Header of table
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        accessor: PropTypes.string,
        minWidth: PropTypes.number, // min width in px
        maxWidth: PropTypes.number, //max width in px
        isVisible: PropTypes.bool,
        sortable: PropTypes.bool,
        filterable: PropTypes.bool,
        filter: PropTypes.shape({
            filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
            type: PropTypes.oneOf(Object.keys(filterType)),
            allowedTypes: PropTypes.arrayOf(PropTypes.string), // array of available operators [keys of filterType object]
        }),
        renderCell: PropTypes.func,
        renderHeaderCell: PropTypes.func,
    })),
    globalFilter: PropTypes.shape({
        filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        type: PropTypes.oneOf(Object.keys(filterType)),
        allowedTypes: PropTypes.arrayOf(PropTypes.string), // array of available operators [keys of filterType object]
    }),
    getTableData: PropTypes.func, // should return array of objects like {'accessor: 'value'}
    custom: PropTypes.objectOf(PropTypes.any),
    getFilterList: PropTypes.func, //async function to get list for filter. async ({accessor, filters}) => ({})
    filterValueName: PropTypes.string, // is used in filter list object
    filterLabelName: PropTypes.string, // is used in filter list object
    filterCheckedName: PropTypes.string, // is used in filter list object
}
NewTable.defaultProps = {
    filterValueName: 'val',
    filterLabelName: 'lab',
    filterCheckedName: 'checked'
}
export default NewTable