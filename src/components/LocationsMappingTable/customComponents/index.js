import React, {Fragment, useState, useContext} from 'react'
import {Button} from "reactstrap"
import PropTypes from 'prop-types'
import Select from 'react-select'
import {TableContext} from '../../TableGrid/TableContext'

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

export const RcCell = ({rowData, accessor}) => {
    const data = rowData[accessor]
    const {updateData, custom} = useContext(TableContext)
    const [editMode, setEditMode] = useState(false)
    const onCLickHandler = (data, updateData) => () => {
        setEditMode(!editMode)
    }
    return (<td>
        <div className="d-flex flex-row justify-content-between">
            <div style={{width: '80%'}}>{editMode ? dropDownSelector(custom.rcList, data) : data}</div>
            <Button color="primary" size="sm" onClick={onCLickHandler(data, updateData)}>{editMode ? 'Сохранить' : 'Изменить'}</Button>
        </div>
    </td>)
}

RcCell.propTypes = {
    data: PropTypes.any,
    index: PropTypes.any,
    updateData: PropTypes.func
}