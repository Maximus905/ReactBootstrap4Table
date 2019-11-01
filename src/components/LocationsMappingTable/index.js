import React, {useEffect, useState} from 'react'
import TableGrid from '../TableGrid'
import {tableConfig} from './config'
import {getRcList} from './async/server'
// import './styles/styles.scss'

const LocationsMappingTable = props => {
    const [rcList, setRcList] = useState([])
    useEffect(() => {
        async function getRegCenters() {
            const res = await getRcList()
            setRcList(res)
        }
        getRegCenters()
    }, [])

    return (<TableGrid {...tableConfig} custom={{rcList}} />)
}

LocationsMappingTable.propTypes = TableGrid.propTypes

LocationsMappingTable.defaultProps = {

}

export default LocationsMappingTable