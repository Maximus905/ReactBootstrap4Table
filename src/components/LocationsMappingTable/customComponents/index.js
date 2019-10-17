import React from 'react'
import {Button} from "reactstrap"
import PropTypes from 'prop-types'

export const RcCell = ({data, index, updateData}) => {
    const onCLickHandler = (data, index, updateData) => () => {
        console.log('onClick', 'data: ', data, 'index: ', index)
        updateData()
    }
    return (<td>
        <div className="d-flex flex-row justify-content-between">
            <div style={{width: '80%'}}>{data}</div>
            <Button color="primary" size="sm" onClick={onCLickHandler(data, index, updateData)} >{'Сохранить'}</Button>
        </div>
    </td>)
}

RcCell.propTypes = {
    data: PropTypes.any,
    index: PropTypes.any,
    updateData: PropTypes.func
}