import React from 'react'
import TableGrid from '../TableGrid'
import {tableConfig} from './config'
// import './styles/styles.scss'

const LocationsMappingTable = props => {
    return (<TableGrid {...tableConfig} />)
}

LocationsMappingTable.propTypes = TableGrid.propTypes

LocationsMappingTable.defaultProps = {

}

export default LocationsMappingTable