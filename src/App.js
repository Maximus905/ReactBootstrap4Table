import React, {useState}  from 'react';
//import PropTypes from 'prop-types';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
// import LocationsMappingTable from "./components/LocationsMappingTable"
import TableGrid from './components/TableGrid'

const App = props => {

    return (
        <Page>
            <PageHeader className="bg-light">This is a Page Header</PageHeader>
            <PageMain className="bg-white">
                {/*<LocationsMappingTable />*/}
                <TableGrid/>
            </PageMain>
            <PageFooter className="bg-light">This is a Page Footer</PageFooter>
        </Page>
    );
};

// App.propTypes = {
//
// };

export default App;
