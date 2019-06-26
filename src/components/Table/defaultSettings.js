const renderRow = () => {}

const renderCell = () => {}

export const defaultTableSettingsProps = () => ({
    width: 100, //table width in percents
    vBorder: 'none', // vertical border
    hBorder: 'none', // horizontal border
    globalFilter: true,
    renderRow
})

export const defaultColumnSettingsProps = () => ({
    title: '',
    accessor: '',
    minWidth: 0, // min column width in px
    maxWidth: 0, // max column width in px
    isVisible: true,
    filterable: false,
    filter: {
        filterBy: [],
        operator: '=',
        operatorsList: ['=']
    },
    renderCell
})

