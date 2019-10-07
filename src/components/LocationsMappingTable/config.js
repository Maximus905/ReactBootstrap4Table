import {renderRowViaAccessors, renderCellWithSelect}  from '../../appSettings'

export const tableConfig = {
    table: {
        renderRow: renderRowViaAccessors
    },
    columns: [
        {
            title: 'Lotus ID',
            accessor: 'lid',
            minWidth: 100,
            maxWidth: 100,
        },
        {
            title: 'Офис',
            accessor: 'loc',
            minWidth: 200,
            maxWidth: 750,
        },
        {
            title: 'Адрес',
            accessor: 'addr',
            minWidth: 200,
            maxWidth: 750,
        },
        {
            title: 'Регион',
            accessor: 'reg',
            minWidth: 200,
            maxWidth: 750,
        },
        {
            title: 'РЦ',
            accessor: 'rc',
            minWidth: 200,
            maxWidth: 750,
            renderCell: renderCellWithSelect
        },
    ]
}