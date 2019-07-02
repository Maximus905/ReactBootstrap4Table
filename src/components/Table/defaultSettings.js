import React from 'react'

const renderHeaderCell = (columnSetting) => {
    const cellStyle = {
        width: columnSetting.width
    }
    return (
        <th className="bg-primary text-light" style={cellStyle}>{columnSetting.title}</th>
    )
}

const renderHeaderRow = (tableSettings, columnsSettings) => {
    return (
        <tr>
            {
                columnsSettings.map(column => renderHeaderCell(column))
            }
        </tr>
    )
}
const renderRow = () => {}

const renderCell = () => {}

export const defaultTableSettings = () => ({
    width: 100, //table width in percents
    vBorder: 'none', // vertical border
    hBorder: 'none', // horizontal border
    globalFilter: true,
    renderRow,
    renderHeaderRow,
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
    renderCell,
    renderHeaderCell
})

export const defaultGlobalFilter = () => ({
    filterBy: [],
    operator: '=',
    operatorsList: ['=']
})

