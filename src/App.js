import React, {useState}  from 'react';
//import PropTypes from 'prop-types';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
// import LocationsMappingTable from "./components/LocationsMappingTable"
import LocationsMappingTable from './components/LocationsMappingTable'
//test
import {DropDown} from './components/DropDown'

const App = props => {

    return (
        <Page>
            <PageHeader className="bg-light">This is a Page Header</PageHeader>
            <PageMain className="bg-white">
                <LocationsMappingTable />
                {/*<div style={{marginLeft: '200px', width: '100px', height: '100px', backgroundColor: 'green'}}>test</div>*/}
                {/*<DropDown style={{marginLeft: '200px'}} classes={'text-primary'}/>*/}
            </PageMain>
            <PageFooter className="bg-light">This is a Page Footer</PageFooter>
        </Page>
    );
};

// App.propTypes = {
//
// };

export default App;
