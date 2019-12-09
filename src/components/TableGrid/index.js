import './typeDefs'
import React from 'react'
import PropTypes from 'prop-types'
import TableGridProvider from './TableGridProvider'
import Table from './Table'

const TableGrid = props => {
    const {table, columns, getTableData, custom} = props
    const tableGridContext = {
        table,
        columns,
        getTableData,
        custom
    }
    return (
        <TableGridProvider {...tableGridContext}>
            <Table />
        </TableGridProvider>
    );
};

TableGrid.propTypes = {
    table: PropTypes.shape({
        width: PropTypes.number, //width of table (% from tBox)
        // vBorder: PropTypes.string,
        // hBorder: PropTypes.string,
        //bs styles for table
        tableStriped: PropTypes.bool,
        tableDark: PropTypes.bool,
        tableBordered: PropTypes.bool,
        tableBorderless: PropTypes.bool,
        tableHover: PropTypes.bool,
        //
        globalFilter: PropTypes.bool,
        renderRow: PropTypes.func, // function for rendering row in Body of table
        renderHeaderRow: PropTypes.func, // function for rendering row in a visible Header of table
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    globalFilter: PropTypes.shape({
        filterBy: PropTypes.arrayOf(PropTypes.string),
        operator: PropTypes.string,
        operatorsList: PropTypes.arrayOf(PropTypes.object),
    }),
    getTableData: PropTypes.func, // should return array of objects
    custom: PropTypes.objectOf(PropTypes.any)
};

export default TableGrid;
