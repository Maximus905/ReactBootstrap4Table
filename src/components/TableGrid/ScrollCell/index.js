import React from 'react'
import PropTypes from 'prop-types'

const ScrollCell = ({scrollsSizes}) => <th style={{width: scrollsSizes.x, padding: 0, borderRight: 0}} />

ScrollCell.propTypes = {
    scrollsSizes: PropTypes.shape({x: PropTypes.number, y: PropTypes.number})
}

export default ScrollCell
