import React from 'react';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
import {API} from "./async";
// import LocationsMappingTable from './components/LocationsMappingTable'
import Table from "./components/Table";
import AsyncTest from "./AsyncTest";
import TestGeoTable from "./components/TestGeoTable";
// import {filterType as ft} from "./components/TableGrid/constants/filters";
import ft from "./components/Table/constatnts/filterTypes";
import faker from "faker";
const mockData = () => [...new Array(5)].map((value, index) => ({column1: `col 1 - data ${index}`, column2: `col 2 - data ${index}`}))

const fake = ((counter = 5) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    let label
    let value
    for ( let i = 0; i < counter; i++ ) {
        label = faker.name.findName()
        value = 'i_' + label
        res.push({
            lab: label,
            val: value,
            checked: true
        })
    }
    res.push({
        lab: '',
        val: 'empty',
        checked: true
    })
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()
const fakeSimpleArray = ((counter = 10) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push(faker.name.lastName())
    }
    res.push(null)
    res.push(undefined)
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()

async function getData() {
    let promise = new Promise(resolve => {
        setTimeout(() => resolve(mockData()), 0)
    })
    return promise
}

async function getFakeFilterList() {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(fakeSimpleArray), 0)
    })
    return promise
}
async function getDropdownList() {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(fakeSimpleArray), 0)
    })
    return promise
}

const customCell = ({accessor, rowData}) => (<td>{rowData[accessor]}</td>)

const config = {
    getTableData: getData,
    getFilterList: getFakeFilterList,
    columns: [
        {
            accessor: 'column1',
            title: 'column 1',
            minWidth: 300,
            maxWidth: 450,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'addr_alt',
                type: 'LIST',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            },
            renderCell: customCell
        },
        {
            accessor: 'column2',
            title: 'column 2',
            minWidth: 400,
            maxWidth: 500,
            sortable: true,
            filterable: true
        }
    ]
}
const App_DropdownList = props => {

    return (
        <Page>
            <PageHeader className="bg-light">This is a Page Header</PageHeader>
            <PageMain className="bg-white">
                {/*<LocationsMappingTable />*/}

                {/*for testing with fake data*/}
                <Table {...config} />

                {/*simple test of async function*/}
                {/*<AsyncTest/>*/}

                {/*test with real data*/}
                {/*<TestGeoTable/>*/}
            </PageMain>
            <PageFooter className="bg-light">This is a Page Footer</PageFooter>
        </Page>
    );
};

export default App_DropdownList;
