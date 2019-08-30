import React from 'react'
import { Button, Form, Input } from 'reactstrap'
import check from "check-types"
/**
 *
 * @param {number|string} data
 * @param {number} index
 * @param {{hBorder: String, vBorder: String}} borders
 */
const renderCellTest1 = (data, index, borders, custom) => {
    return <td key={index} className='bg-primary' style={index === 0 ? {borderTop: borders.hBorder, borderRight: borders.vBorder,  borderLeft: borders.vBorder} : {borderTop: borders.hBorder, borderRight: borders.vBorder}}>{data + 'test'}</td>
}
const dropDown = (listData) => (
    <Form>
        <Input type='select' name='select' id='exampleSelect' >
            {listData.map(item => (<option>{item}</option>))}
        </Input>
    </Form>
)
/**
 *
 * @param {number|string} data
 * @param {number} index
 * @param {{hBorder: String, vBorder: String}} borders
 * @param {{editMode: boolean, listData: Array}}custom
 */
const renderCellWithSelect = (data, index, borders, custom) => {
    const {onClickButtonHandler, editMode, listData} = custom
    return <td key={index} className='bg-light' style={index === 0 ? {borderTop: borders.hBorder, borderRight: borders.vBorder,  borderLeft: borders.vBorder} : {borderTop: borders.hBorder, borderRight: borders.vBorder}}>
        <div className="d-flex flex-row justify-content-between">
            <div>{editMode ? dropDown(listData) : data}</div>
            <Button color="primary" size="sm" onClick={onClickButtonHandler}>{custom.editMode ? 'Сохранить' : 'Изменить'}</Button>
        </div>
    </td>
}

const renderRow = (rowData, rowIndex, columnsSettings, custom) => {
    const {onChangeEditModeHandler, rowsInEditMode} = custom
    const onClickButtonHandler = (rowIndex) => () => {
        onChangeEditModeHandler(rowIndex)
    }
    return (<tr key={rowIndex}>
        {rowData.map((cellData, cellIndex) => {
            console.log()
            const {hBorder, vBorder} = columnsSettings[cellIndex]
            return columnsSettings[cellIndex].renderCell(cellData, cellIndex, {hBorder, vBorder}, {...custom, editMode: rowsInEditMode.includes(rowIndex), onClickButtonHandler: onClickButtonHandler(rowIndex)})
        })}
    </tr>)
}



export const tableConfig = {
    table: {
        renderRow
    },
    columns: [
        {
            title: 'Офис',
            accessor: 'office',
            minWidth: 400,
            maxWidth: 750,
        },
        {
            title: 'РЦ',
            accessor: 'reg_center',
            minWidth: 300,
            maxWidth: 750,
            renderCell: renderCellWithSelect
        },
    ]
}

export const mockData = [
    ['office 1', 'RC 1'],
    ['office 2', 'RC 2'],
    ['office 3', 'RC 3'],
    ['office 4', 'RC 4'],
    ['office 5', 'RC 5'],
]
