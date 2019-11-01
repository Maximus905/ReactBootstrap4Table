import {useContext} from 'react'
import {TableContext} from '../TableContext'

const HeaderRow = (props) => {
    const {tableSettings} = useContext(TableContext)
    const {children} = props
    return tableSettings.renderHeaderRow({children})
}

export default HeaderRow