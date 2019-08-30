import React, {useState}  from 'react';
//import PropTypes from 'prop-types';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
import MappingTable from "./components/MappingTable"
import {tableConfig, mockData, selectData} from './appSettings'

const App = props => {

    return (
        <Page>
            <PageHeader className="bg-light">This is a Page Header</PageHeader>
            <PageMain className="bg-white">
                <MappingTable {...tableConfig} rowsData={mockData}/>
            </PageMain>
            <PageFooter className="bg-light">This is a Page Footer</PageFooter>
        </Page>
    );
};

// App.propTypes = {
//
// };

export default App;
