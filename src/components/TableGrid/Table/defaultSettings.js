import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames"
import {TableContext} from '../TableContext'
// import Filters from "../../Filters";
import Filter from "../../Filter_orig";
import {columnFilterSettingsTemplate} from "../constants/initial";
import faker from "faker";

const fake = ((counter = 1000) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push({
            lab: faker.name.findName(),
            val: faker.name.lastName(),
            checked: true
        })
    }
    res.push({
        lab: '',
        val: 'empty',
        checked: true
    })
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()

const sortIcons = {
    desc: <FontAwesomeIcon icon={faLongArrowAltDown} size={"sm"} />,
    asc: <FontAwesomeIcon icon={faLongArrowAltUp} size={"sm"} />
}

const DefaultHeaderCell = (props) => {
    const {sorting, addSortAccessor, setSortAccessor, tableBoxSizes: {bodyHeight}, visibleFiltersSettings, changeColumnFilterType} = useContext(TableContext)
    const {columnSettings, columnSettings: {accessor, filterable}} = props
    console.log('DefaultHeaderCell', accessor,  visibleFiltersSettings)
    const accessorList = sorting.map(item => Object.keys(item)[0])
    const index = (accessors, accessorName) => {
        if (accessors.length <= 1) return undefined
        return accessors.indexOf(accessorName) + 1
    }
    const getSortIcon = () => {
        const sortObj = sorting.filter((item) => Object.keys(item)[0] === accessor)[0]
        return sortObj ? sortIcons[sortObj[accessor]] : undefined
    }
    const handlerOnClick = (e) => {
        e.ctrlKey ? addSortAccessor(accessor) : setSortAccessor(accessor)
    }
    const cellStyle = {
        width: columnSettings.width,
        cursor: 'default'
    }
    const sortIndex = index(accessorList, accessor)
    return (<th className='align-top' style={cellStyle} onClick={handlerOnClick} >
        <div className={classNames('d-flex', 'justify-content-between')}>
            <div className={classNames('d-flex', 'justify-content-start')}>
                {columnSettings.title}
                <div style={{marginLeft: 5, width: 25, opacity: 0.5}}  className={classNames('d-flex', 'justify-content-around', 'align-items-center')}>
                    {getSortIcon()}{sortIndex && sortIndex > 0 ? <span>{sortIndex}</span> : ''}
                </div>
            </div>
            <div>{filterable && <Filter accessor={accessor} maxWidth={300} maxHeight={bodyHeight * 0.8} data={fake} direction="down" filterSettings={visibleFiltersSettings[accessor]} onSaveSettings={changeColumnFilterType} />}</div>
        </div>
    </th>)
}

DefaultHeaderCell.propTypes = {
    columnsSettings: PropTypes.object,
}

// default render functions for header
const renderHeaderCellDefault = ({columnSettings}) => {
    return <DefaultHeaderCell {...{columnSettings}} />
}

const renderHeaderRowDefault = ({children}) => {
    return (<tr>{children}</tr>)

}

//default render functions for body
/**
 *
 * @param {Object} rowData contain data of row {{accessor1: value}, {accessorN: value}}
 * @param {string} accessor
 */
const renderCellDefault = ({rowData, accessor}) => {
    return (<td>{rowData[accessor]}</td>)
}

/**
 *
 * @param {Object} rowData contain data of row {{accessor1: value}, {accessorN: value}}
 * @param {node[]} children array of cell's nodes inside this row
 */
const renderRowDefault = ({rowData, children}) =>
{
    return (<tr>{children}</tr>)
}

// default settings for table and columns
export const defaultTableSettings = () => ({
    width: 100, //table width in percents
    globalFilter: true,
    tableSmall: false,
    tableStriped: false,
    tableDark: false,
    tableBordered: false,
    tableBorderless: false,
    tableHover: false,
    renderRow: renderRowDefault,
    renderHeaderRow: renderHeaderRowDefault,
})

/**
 *
 * @param columnProps
 * @return {ColumnShape}
 */
export const defaultColumnSettings = (columnProps) => {
    const {filter, accessor} = columnProps
    const columnFilter = filter ? {...columnFilterSettingsTemplate(accessor), ...filter} : columnFilterSettingsTemplate(accessor)
    return ({
        title: '',
        accessor: '',
        minWidth: 0, // min column width in px
        maxWidth: 0, // min column width in px
        isVisible: true,
        filterable: false,
        filter: columnFilter,
        sortable: true,
        renderCell: columnProps.renderCell ? columnProps.renderCell : renderCellDefault,
        renderHeaderCell: columnProps.renderHeaderCell ? columnProps.renderHeaderCell : renderHeaderCellDefault
    })
}