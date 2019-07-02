import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import ScrollbarSize from 'react-scrollbar-size'
import css from './style.module.css'
import {useEvent} from '../Hooks'
import {calculateVisibleColumnsSizes, getVisibleColumnsSettings, getTableSettings} from './selectors'

const Table = props => {
    const [tableBoxSizes, setTableBoxSizes] = useState()
    const [scrollsSizes, setScrollsSize] = useState({x: 0, y: 0})
    const [columnsSizes, setColumnsSizes] = useState([])
    useEvent('resize', onResizeHandler)
    const refTableBox = useRef(null)
    useEffect(() => {
        if (!tableBoxSizes) setTableBoxSizes({width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight})
        console.log('state tableBoxSize', tableBoxSizes)
    }, [tableBoxSizes])

    useEffect(() => {
        setColumnsSizes(calculateVisibleColumnsSizes(tableBoxSizes, props))
    }, [tableBoxSizes, props, columnsSizes])

    const columnsSettings = getVisibleColumnsSettings(tableBoxSizes, props)
    const tableSettings = getTableSettings(tableBoxSizes, props)

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
        <React.Fragment>
            <div className={classNames(css.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox}>
                <div className={classNames(css.tHdBdBox, "d-flex", "flex-column", "flex-grow-1", "bg-secondary")}>
                    <div className={classNames(css.tHdBox, "bg-light")} style={tableHdBoxSizeCss}>
                        <table className="table" style={tableSizeCss}>
                            <thead>
                                {tableSettings.renderHeaderRow(tableSettings, columnsSettings)}
                            </thead>
                        </table>
                    </div>
                    <div className={classNames(css.tBdBox, css.tBdBoxSz, "bg-info", "flex-grow-1")} style={tableBdBoxSizeCss}>
                        <table className="table" style={tableSizeCss}>
                            {tableSettings.renderHeaderRow(tableSettings, columnsSettings)}
                        </table>
                    </div>
                </div>
                <div className={classNames("bg-warning")} style={tableFtBoxSizeCss}>Table Footer</div>
            </div>
            <ScrollbarSize onLoad={(measurements) => setScrollsSize({x: measurements.scrollbarHeight, y: measurements.scrollbarWidth})}/>
        </React.Fragment>
    );

    function onResizeHandler() {
        setTableBoxSizes({width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight})
        console.log('resize', tableBoxSizes)
    }


}

Table.propTypes = {
    table: PropTypes.shape({
        width: PropTypes.number, //width of table (% from tBox)
        vBorder: PropTypes.string,
        hBorder: PropTypes.string,
        globalFilter: PropTypes.bool,
        renderRow: PropTypes.func,
        renderHeaderRow: PropTypes.func,
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        accessor: PropTypes.string,
        minWidth: PropTypes.number, // min width in px
        maxWidth: PropTypes.number, //max width in px
        isVisible: PropTypes.bool,
        filterable: PropTypes.bool,
        filter: PropTypes.shape({
            filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
            operator: PropTypes.string,
            operatorsList: PropTypes.arrayOf(PropTypes.object), // array of available operators [{operatorValue: operatorName}]
        }),
        renderCell: PropTypes.func,
        renderHeaderCell: PropTypes.func,
    })),
    globalFilter: PropTypes.shape({
        filterBy: PropTypes.arrayOf(PropTypes.string),
        operator: PropTypes.string,
        operatorsList: PropTypes.arrayOf(PropTypes.object),
    })
};

export default Table

