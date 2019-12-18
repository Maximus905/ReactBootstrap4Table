import React from 'react';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
import LocationsMappingTable from './components/LocationsMappingTable'

const App = props => {

    return (
        <Page>
            <PageHeader className="bg-light">This is a Page Header</PageHeader>
            <PageMain className="bg-white">
                <LocationsMappingTable />
            </PageMain>
            <PageFooter className="bg-light">This is a Page Footer</PageFooter>
        </Page>
    );
};

export default App;
