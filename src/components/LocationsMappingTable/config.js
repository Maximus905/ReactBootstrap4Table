import {renderCellTest}  from './renderFunctions'
import {getDataRemote} from './async/server'

export const tableConfig = {
    getTableData: getDataRemote,
    table: {
        tableDark: false,
        tableSmall: true,
        tableBordered: true,
        // renderRow: renderRowViaAccessors
    },
    columns: [
        {
            title: 'Lotus ID',
            accessor: 'id',
            minWidth: 120,
            maxWidth: 120,
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
            renderCell: renderCellTest
        },
    ]
}