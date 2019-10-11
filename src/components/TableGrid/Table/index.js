import React, {Fragment, useRef, useContext, useEffect} from 'react'
import {TableGridContext} from '../Provider'
import {requestAllData} from '../actions'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './style.module.css'
import ScrollbarSize from "react-scrollbar-size"
import {useEvent} from '../customHooks'

function Table(props) {
    const refTableBox = useRef(null)
    const {state, dispatch} = useContext(TableGridContext)
    const {didInvalidate} = state
    useEffect(() => {
        if (!didInvalidate) {
            dispatch(requestAllData({filter: 'test'}))
        }
    }, [didInvalidate, dispatch])
    console.log('state', state)
    // function onResizeHandler() {
    //     setTableBoxSizes({width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight})
    //     console.log('resize', tableBoxSizes)
    // }

    return (
        <h2>test</h2>
    )

    // return (
    //     <Fragment>
    //         <div className={classNames(css.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox}>
    //             <div className={classNames(css.tHdBdBox, "d-flex", "flex-column", "flex-grow-1")}>
    //                 <div className={classNames(css.tHdBox, "bg-light")} style={tableHdBoxSizeCss}>
    //                     <table className={classNames("table", css.fixTableSizes)} style={tableSizeCss}>
    //                         <thead>
    //                         {tableSettings.renderHeaderRow(tableSettings, columnsSettings, scrollsSizes, props.custom)}
    //                         </thead>
    //                     </table>
    //                 </div>
    //                 <div className={classNames(css.tBdBox, css.tBdBoxSz, "bg-light", "flex-grow-1")} style={tableBdBoxSizeCss}>
    //                     <table className={classNames("table", css.fixTableSizes)} style={tableSizeCss}>
    //                         <thead className={css.hiddenHeader}>
    //                         {tableSettings.renderHeaderRow(tableSettings, columnsSettings, props.custom)}
    //                         </thead>
    //                         <tbody>
    //                         {tableData.map((rowData, index) => tableSettings.renderRow(rowData, index, columnsSettings, props.custom))}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //             <div className={classNames("bg-warning")} style={tableFtBoxSizeCss}>Table Footer</div>
    //         </div>
    //         <ScrollbarSize onLoad={(measurements) => setScrollsSize({x: measurements.scrollbarHeight, y: measurements.scrollbarWidth})}/>
    //     </Fragment>
    // )
}



export default Table