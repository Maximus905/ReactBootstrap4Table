import React, {Fragment} from 'react'
import { Button } from 'reactstrap'
import Select from 'react-select'
import {RcCell} from './customComponents'

export const renderCellTest = (props) => {
    return <RcCell key={props.index} {...props} />
}

/**
 *
 * @param listData
 * @param defaultValue
 */
const dropDownSelector = (listData, defaultValue) => {
    function defaultValueIdx() {
        return listData.reduce((res, val, idx) => res === '' && val.label === defaultValue ? idx : res, '')
    }
    return(
        <Fragment>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={listData[defaultValueIdx()]}
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={listData}
                onChange={(selected) => console.log(selected)}
            />
        </Fragment>
    )}
/**
 *
 * @param {number|string} data
 * @param {number} index
 * @param {{hBorder: String, vBorder: String}} borders
 * @param {{editMode: boolean, listData: Array}}custom
 */
export const renderCellWithSelect = (data, index, borders, custom) => {
    const {onClickButtonHandler, editMode, selectOptions} = custom
    return <td key={index} className='bg-light' style={index === 0 ? {borderTop: borders.hBorder, borderRight: borders.vBorder, borderLeft: borders.vBorder} : {borderTop: borders.hBorder, borderRight: borders.vBorder}}>
        <div className="d-flex flex-row justify-content-between">
            <div style={{width: '80%'}}>{editMode ? dropDownSelector(selectOptions, data) : data}</div>
            <Button color="primary" size="sm" onClick={onClickButtonHandler}>{custom.editMode ? 'Сохранить' : 'Изменить'}</Button>
        </div>
    </td>
}
// const onCLickHandler = (data, index, updateData) => () => {
//     console.log('onClick', 'data: ', data, 'index: ', index)
//     updateData()
// }
// export const renderCellTest = ({data, index, updateData}) => {
//     return <td key={index}>
//         <div className="d-flex flex-row justify-content-between">
//             <div style={{width: '80%'}}>{data}</div>
//             <Button color="primary" size="sm" onClick={onCLickHandler(data, index, updateData)} >{'Сохранить'}</Button>
//         </div>
//     </td>
// }

export const renderRow = (rowData, rowIndex, columnsSettings, custom) => {

    const {onChangeEditModeHandler, rowsInEditMode} = custom
    const onClickButtonHandler = (rowIndex) => () => {
        onChangeEditModeHandler(rowIndex)
    }
    return (<tr key={rowIndex}>
        {rowData.map((cellData, cellIndex) => {
            const {hBorder, vBorder, accessor} = columnsSettings[cellIndex]
            console.log(accessor)
            return columnsSettings[cellIndex].renderCell(cellData, cellIndex, {hBorder, vBorder}, {...custom, editMode: rowsInEditMode.includes(rowIndex), onClickButtonHandler: onClickButtonHandler(rowIndex)})
        })}
    </tr>)
}
export const renderRowCustom = (rowData, rowIndex, columnsSettings, custom) => {
    const {onChangeEditModeHandler, rowsInEditMode} = custom
    const onClickButtonHandler = (rowIndex) => () => {
        onChangeEditModeHandler(rowIndex)
    }
    console.log(rowData)
    return (<tr key={rowIndex}>
        {columnsSettings.map((columnSettings, cellIndex) => {
            const {hBorder, vBorder, accessor} = columnSettings
            return columnSettings.renderCell(rowData[accessor], cellIndex, {hBorder, vBorder}, {...custom, editMode: rowsInEditMode.includes(rowIndex), onClickButtonHandler: onClickButtonHandler(rowIndex)})
        })}
    </tr>)
}

