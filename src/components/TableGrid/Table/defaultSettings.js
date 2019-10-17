import React from 'react'

// default render functions for header
const renderHeaderCellDefault = (columnSetting, index) => {
    const cellStyle = {
        width: columnSetting.width
    }
    return (<th className="" style={cellStyle} key={index}>{columnSetting.title}</th>)
}

const renderScrollCell = (scrollsSizes, cssClass, index) => {
    return (<th key={index} className={cssClass} style={{width: scrollsSizes.x, padding: 0, borderRight: 0}}/>)
}

const renderHeaderRowDefault = (tableSettings, columnsSettings, scrollsSizes, custom) => {
    const data = []
    data.push(columnsSettings.map((column, index) => column.renderHeaderCell(column, index, custom)))
    if (scrollsSizes)  data.push(renderScrollCell(scrollsSizes, '', columnsSettings.length))
    return (<tr>{data}</tr>)

}

//default render functions for body
/**
 *
 * @param {number|string} data
 * @param {number} index
 */
const renderCellDefault = ({data, index, updateData}) => {
    return (<td key={index} >{data}</td>)
}

/**
 *
 * @param {Array} rowData
 * @param {number} rowIndex
 * @param {Array} columnsSettings
 */
const renderRowDefault = ({rowData, rowIndex, columnsSettings, updateData}) =>
{
    // console.log('render row default', rowData, rowIndex, columnsSettings, custom)
    return (<tr key={rowIndex}>
        {columnsSettings.map((columnSettings, cellIndex) => {
            const { accessor} = columnSettings
            return columnSettings.renderCell({data: rowData[accessor], index: cellIndex, updateData})
        })}
    </tr>)
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

export const defaultColumnSettings = (columnProps) => ({
    title: '',
    accessor: '',
    minWidth: 0, // min column width in px
    maxWidth: 0, // min column width in px
    isVisible: true,
    filterable: false,
    filter: {
        filterBy: columnProps.accessor,
        operator: '=',
        operatorsList: ['=']
    },
    renderCell: columnProps.renderCell ? columnProps.renderCell : renderCellDefault,
    renderHeaderCell: columnProps.renderHeaderCell ? columnProps.renderHeaderCell : renderHeaderCellDefault
})