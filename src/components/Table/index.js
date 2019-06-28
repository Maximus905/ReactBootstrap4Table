import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import ScrollbarSize from 'react-scrollbar-size'
import css from './style.module.css'
import {useEvent} from '../Hooks'
import {calculateVisibleColumnsSizes} from './settingsSelectors'

const Table = props => {
    const [tableBoxSize, setTableBoxSize] = useState()
    const [scrollsSizes, setScrollsSize] = useState({x: 0, y: 0})
    const [columnsSizes, setColumnsSizes] = useState([])
    useEvent('resize', onResizeHandler)
    const refTableBox = useRef(null)
    useEffect(() => {
        if (!tableBoxSize) setTableBoxSize({width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight})
        console.log('state', tableBoxSize)
    }, [tableBoxSize])

    useEffect(() => {
        setColumnsSizes(calculateVisibleColumnsSizes(tableBoxSize, props, scrollsSizes))
        console.log('calculate columns', columnsSizes)
    }, [tableBoxSize, props, scrollsSizes])

    // console.log('columns', getVisibleColumnsSettings(tableBoxSize, props))
    // console.log('table box', calculateColumnsSizes(tableBoxSize, props))
    const debug = () => {
        if (columnsSizes.length === 0) return 'empty'
        return `${columnsSizes[0].width} / ${columnsSizes[1].width}`
    }
    return (
        <React.Fragment>
            <div className={classNames(css.tBox, "d-flex", "flex-column", "bg-success")} ref={refTableBox}>
                <div className={classNames(css.tHdBdBox, "d-flex", "flex-column", "flex-grow-1", "bg-secondary")}>
                    <div className={classNames(css.tHdBox, "bg-light")}>
                        <div className={classNames(css.tHeaderContent, "bg-primary")}>
                            Table Header
                        </div>
                    </div>
                    <div className={classNames(css.tBdBox, css.tBdBoxSz, "bg-info")}>
                        <div className={classNames(css.tBodyContent, "bg-warning")}>
                            Table Body Content {debug()}
                        </div>
                    </div>
                </div>
                <div className={classNames()}>Table Footer</div>
            </div>
            <ScrollbarSize onLoad={(measurements) => setScrollsSize({x: measurements.scrollbarHeight, y: measurements.scrollbarWidth})}/>
        </React.Fragment>
    );

    function onResizeHandler() {
        setTableBoxSize({width: refTableBox.current.clientWidth, height: refTableBox.current.clientHeight})
        console.log('resize', tableBoxSize)
    }


}

Table.propTypes = {
    table: PropTypes.shape({
        width: PropTypes.number, //width of table (% from tBox)
        vBorder: PropTypes.string,
        hBorder: PropTypes.string,
        globalFilter: PropTypes.bool,
        renderRow: PropTypes.func,
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
    })),
    globalFilter: PropTypes.shape({
        filterBy: PropTypes.arrayOf(PropTypes.string),
        operator: PropTypes.string,
        operatorsList: PropTypes.arrayOf(PropTypes.object),
    })
};

export default Table

