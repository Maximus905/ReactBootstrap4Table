/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import React, {useRef, useState} from 'react';
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page"
import {API} from "./async";
// import LocationsMappingTable from './components/LocationsMappingTable'
import Table from "./components/Table";
import AsyncTest from "./AsyncTest";
import TestGeoTable from "./components/TestGeoTable";
// import {filterType as ft} from "./components/TableGrid/constants/filters";
import ft from "./components/Table/constatnts/filterTypes";
import faker from "faker";
import DropdownList from "./components/DropdownList";
const mockData = () => [...new Array(10)].map((value, index) => ({id: index, column1: `col 1 - data ${index}`, column2: `col 2 - data ${index}`}))
const dropdownListData = () => {
    return mockData().map(item => item.column1)
}

const fake = ((counter = 2) => {
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
const fakeSimpleArray = ((counter = 500) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push(faker.name.lastName())
    }
    res.push(null)
    res.push(undefined)
    res.push(true)
    res.push(false)
    console.log('fake data has been generated: ', Date.now() - time, res.length)
    return res
})()

// async function getData() {
//     let promise = new Promise(resolve => {
//         setTimeout(() => resolve(tableData), 0)
//     })
//     return promise
// }

async function getFakeFilterList() {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(fakeSimpleArray), 0)
    })
    return promise
}
async function getDropdownList() {
    const promise = new Promise(resolve => {
        // setTimeout(() => resolve(fakeSimpleArray), 0)
        setTimeout(() => resolve(dropdownListData()), 0)
    })
    console.log('fetch data', promise)
    return promise
}
// const EditableCell = ({accessor, rowData, width}) => {
//     const [onHover, setOnHover] = useState(false)
//     const [editMode, setEditMode] = useState(false)
//
//     const onCloseHandler = () => {
//         setEditMode(false)
//         setOnHover(false)
//     }
//     return <td className="d-flex justify-content-between" css={css`position: relative`}
//                onMouseEnter={() => setOnHover(true) }
//                onMouseLeave={() => setOnHover(false) }
//     >
//         <div>{rowData[accessor]}</div>
//         {(onHover || editMode) && <DropdownList getData={getDropdownList} accessor={accessor} maxWidth={350} minWidth={200} onOpen={() => setEditMode(true)} onClose={onCloseHandler} selected={[rowData[accessor]]} maxHeight={200} />}
//     </td>
// }

const App_DropdownList = props => {
    const customCell = ({accessor, rowData, width}) => <EditableCell {...{accessor, rowData, width}} />
    const [data, setData] = useState(mockData())
//***********************
    async function getData() {
        let promise = new Promise(resolve => {
            setTimeout(() => resolve(data), 0)
        })
        return promise
    }
    const onChangeCellHandler = (id) => ({accessor, value}) => {
        console.log('saving', id, accessor, value)
        setData(prevData => prevData.map(item => item.id === id ? {...item, [accessor]: value}: item))
    }

    const EditableCell = ({accessor, rowData, width}) => {
        const [onHover, setOnHover] = useState(false)
        const [editMode, setEditMode] = useState(false)

        const onCloseHandler = () => {
            setEditMode(false)
            setOnHover(false)
        }
        return <td className="d-flex justify-content-between" css={css`position: relative`}
                   onMouseEnter={() => setOnHover(true) }
                   onMouseLeave={() => setOnHover(false) }
        >
            <div>{rowData[accessor]}</div>
            {(onHover || editMode) && <DropdownList getData={getDropdownList} accessor={accessor} maxWidth={350} minWidth={200} onOpen={() => setEditMode(true)} onClose={onCloseHandler} selected={[rowData[accessor]]} maxHeight={200} onChangeSelected={onChangeCellHandler(rowData.id)} />}
        </td>
    }
//******************************
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
