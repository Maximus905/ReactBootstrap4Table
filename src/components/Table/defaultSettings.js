const renderRow = () => {}

const renderCell = () => {}

export const defaultTableSettings = () => ({
    width: 100, //table width in percents
    vBorder: 'none', // vertical border
    hBorder: 'none', // horizontal border
    globalFilter: true,
    renderRow
})

export const defaultColumnSettings = () => ({
    title: '',
    accessor: '',
    minWidth: 0, // min column width in px
    maxWidth: 0, // min column width in px
    isVisible: true,
    filterable: false,
    filter: {
        filterBy: [],
        operator: '=',
        operatorsList: ['=']
    },
    renderCell
})

