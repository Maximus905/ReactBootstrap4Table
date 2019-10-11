import React from 'react'

const renderHeaderCellDefault = (columnSetting, index) => {
    const cellStyle = {
        width: columnSetting.width
    }
    return (<th className="bg-primary text-light" style={cellStyle} key={index}>{columnSetting.title}</th>)
}

const renderScrollCell = (scrollsSizes, cssClass, index) => {
    return (<th key={index} className={cssClass} style={{width: scrollsSizes.x, padding: 0, borderRight: 0}}/>)
}

const renderHeaderRowDefault = (tableSettings, columnsSettings, scrollsSizes, custom) => {
    const data = []
    data.push(columnsSettings.map((column, index) => column.renderHeaderCell(column, index, custom)))
    if (scrollsSizes)  data.push(renderScrollCell(scrollsSizes, 'bg-primary', columnsSettings.length))
    return (<tr>{data}</tr>)

}

/**
 *
 * @param {number|string} data
 * @param {number} index
 * @param {{hBorder: String, vBorder: String}} borders
 * @param {Object} custom
 */
const renderCellDefault = (data, index, borders, custom) => {
    return (<td key={index} style={index === 0 ? {borderTop: borders.hBorder, borderRight: borders.vBorder,  borderLeft: borders.vBorder} : {borderTop: borders.hBorder, borderRight: borders.vBorder}} >{data}</td>)
}

/**
 *
 * @param {Array} rowData
 * @param {number} rowIndex
 * @param {Array} columnsSettings
 * @param {Object}custom
 */
const renderRowDefault = (rowData, rowIndex, columnsSettings, custom) =>
    {
        return (<tr key={rowIndex}>
                {rowData.map((cellData, cellIndex) => {
                    const {hBorder, vBorder} = columnsSettings[cellIndex]
                    return columnsSettings[cellIndex].renderCell(cellData, cellIndex, {hBorder, vBorder}, custom)
                })}
            </tr>)
    }


export const defaultTableSettings = () => ({
    width: 100, //table width in percents
    globalFilter: true,
    renderRow: renderRowDefault,
    renderHeaderRow: renderHeaderRowDefault,
})

export const defaultColumnSettings = (columnProps) => ({
    title: '',
    accessor: '',
    minWidth: 0, // min column width in px
    maxWidth: 0, // min column width in px
    isVisible: true,
    filterable: false,
    hBorder: '1px solid #dee2e6',
    vBorder: '1px solid #dee2e6',
    filter: {
        filterBy: columnProps.accessor,
        operator: '=',
        operatorsList: ['=']
    },
    renderCell: columnProps.renderCell ? columnProps.renderCell : renderCellDefault,
    renderHeaderCell: columnProps.renderHeaderCell ? columnProps.renderHeaderCell : renderHeaderCellDefault
})

export const defaultGlobalFilter = () => ({
    filterBy: [],
    operator: '=',
    operatorsList: ['=']
})

