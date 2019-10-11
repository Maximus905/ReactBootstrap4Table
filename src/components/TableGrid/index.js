import React from 'react'
import PropTypes from 'prop-types'
import Provider from './Provider'
import Table from './Table'

const TableGrid = props => {
    return (
        <Provider>
            <Table/>
        </Provider>
    );
};

TableGrid.propTypes = {

};

export default TableGrid;
