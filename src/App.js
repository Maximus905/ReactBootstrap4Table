import React from 'react';
//import PropTypes from 'prop-types';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
// import LocationsMappingTable from "./components/LocationsMappingTable"
import LocationsMappingTable from './components/LocationsMappingTable'
//test
// import {DropDown} from './components/DropDown'
// import BsSelect from "./components/BsSelect";
// import DropDown2 from "./components/DropDown2";
// import DropDownReact from "./components/DropDownReact";
// import DropDownReactWrap from "./components/DropDownReactWrap";
import DropdownListWrap from "./components/DropdownListWrap";

const App = props => {

    return (
        <Page>
            <PageHeader className="bg-light">This is a Page Header</PageHeader>
            <PageMain className="bg-white">
                <LocationsMappingTable />
                {/*<div style={{padding: 20}}>*/}
                {/*    <DropdownListWrap/>*/}
                {/*</div>*/}
            </PageMain>
            <PageFooter className="bg-light">This is a Page Footer</PageFooter>
        </Page>
    );
};

// App.propTypes = {
//
// };

export default App;
