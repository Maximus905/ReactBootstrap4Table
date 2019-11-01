import React from "react"
import PropTypes from "prop-types";

const SimpleHeaderCell = (props) => {
    const {columnSettings} = props
    const cellStyle = {
        width: columnSettings.width,
    }
    return (<th style={cellStyle} />)
}
SimpleHeaderCell.propTypes = {
    columnsSettings: PropTypes.object,
}


export default SimpleHeaderCell