const BodyCell = ({rowData, accessor, columnSettings}) => {
    return columnSettings.renderCell({rowData, accessor})
}

export default BodyCell