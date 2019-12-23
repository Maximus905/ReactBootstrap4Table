import {renderCellTest}  from './renderFunctions'
import {getDataRemote} from './async/server'
import {filterType as ft} from "../TableGrid/constants/filters";

export const tableConfig = {
    getTableData: getDataRemote,
    table: {
        tableDark: true,
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
            filterable: true
        },
        {
            title: 'Адрес',
            accessor: 'addr',
            minWidth: 200,
            maxWidth: 750,
            filterable: true,
            filter: {
                filterBy: 'addr_alt',
                type: 'LIST',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            }
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