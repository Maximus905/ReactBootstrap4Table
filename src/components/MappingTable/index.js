import React, {useState} from 'react'
import Table from '../Table'
import axios from 'axios'

import {REG_CENTERS_URL} from '../../constants'

const selectData = [
    'row 1',
    'row 2',
    'row 3',
]

const getRegCenters = async () => {
    try {
        const res = await axios.get(REG_CENTERS_URL)
    } catch (e) {
        console.log('ERROR', e)
        alert(e)
    }
}

const MappingTable = props => {
    const [rowsInEditMode, changeEditMode] = useState([])
    const onChangeEditModeHandler = (rowIndex) => {
        changeEditMode(rowsInEditMode.includes(rowIndex) ? rowsInEditMode.filter(item => item !== rowIndex) : [...rowsInEditMode, rowIndex])
    }
    console.log('rowsInEdit', rowsInEditMode)
    return (<Table {...props} custom={{rowsInEditMode, listData: selectData, onChangeEditModeHandler}} />)
}

MappingTable.propTypes = Table.propTypes

MappingTable.defaultProps = {

}

export default MappingTable