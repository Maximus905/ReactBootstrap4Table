import{useContext} from 'react'
import {TableContext} from '../TableContext'

const BodyRow = ({rowData, children}) => {
    const {tableSettings} = useContext(TableContext)
    return tableSettings.renderRow({rowData, children})
}

export default BodyRow