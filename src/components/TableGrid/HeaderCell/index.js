import PropTypes from 'prop-types'

const HeaderCell = ({columnSettings}) => {
    return columnSettings.renderHeaderCell({columnSettings})
}

HeaderCell.propTypes = {
    columnSettings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        accessor: PropTypes.string,
        minWidth: PropTypes.number, // min width in px
        maxWidth: PropTypes.number, //max width in px
        isVisible: PropTypes.bool,
        filterable: PropTypes.bool,
        filter: PropTypes.shape({
            filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
            operator: PropTypes.string,
            operatorsList: PropTypes.arrayOf(PropTypes.object), // array of available operators [{operatorValue: operatorName}]
        }),
        renderCell: PropTypes.func,
        renderHeaderCell: PropTypes.func,
    }),
    custom: PropTypes.object,
    isBodyHeader: PropTypes.bool
}

export default HeaderCell;
