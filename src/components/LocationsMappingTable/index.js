import React, {useState, useEffect} from 'react'
import Table from '../Table'
import axios from 'axios'
import {tableConfig} from './config'
// import './styles/styles.scss'

import {REG_CENTERS_URL, ROOMS_1C_URL, LOCATIONS_URL} from '../../constants'

const LocationsMappingTable = props => {
    const [rowsInEditMode, changeEditMode] = useState([])
    const [rcList, changeRcList] = useState([])
    // const [locations, changeLocations] = useState([])
    async function getRcList() {
        try {
            const response = await axios.get(REG_CENTERS_URL)
            changeRcList(response.data.result)
        } catch (e) {
            console.log('ERROR', e)
            alert(e)
        }

    }
    async function getLocationList() {
        try {
            const response = await axios.get(LOCATIONS_URL)
            console.log('response', response)
            return response.data.result
        } catch (e) {
            console.log('ERROR', e)
            alert(e)
        }
    }
    useEffect(() => {
        getRcList()
    }, [])

    const updateLocation = async (rowIndex, lid, rc) => {
        try {
            console.log('updated location', rowIndex, lid, rc)
        } catch (e) {
            console.log('ERROR saving changed location', e)
            alert('Ошибка сохранения')
        }
    }
    const onChangeEditModeHandler = (rowIndex) => {
        const editMode = rowsInEditMode.filter(item => item !== rowIndex)
        changeEditMode(rowsInEditMode.includes(rowIndex) ? rowsInEditMode.filter(item => item !== rowIndex) : [...rowsInEditMode, rowIndex])
    }
    return (<Table {...tableConfig} getTableData={getLocationList} custom={{rowsInEditMode, selectOptions: rcList, onChangeEditModeHandler}} />)
}

LocationsMappingTable.propTypes = Table.propTypes

LocationsMappingTable.defaultProps = {

}

export default LocationsMappingTable