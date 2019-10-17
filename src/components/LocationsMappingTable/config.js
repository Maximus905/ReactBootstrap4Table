import {renderRowCustom, renderCellWithSelect, renderCellTest}  from './renderFunctions'
import {getDataRemote} from './async/server'

export const tableConfig = {
    getTableData: getDataRemote,
    table: {
        tableDark: true,
        tableSmall: false,
        // renderRow: renderRowViaAccessors
    },
    columns: [
        {
            title: 'Lotus ID',
            accessor: 'id',
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
            renderCell: renderCellTest
        },
    ]
}