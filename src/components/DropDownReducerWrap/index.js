import React, {useState} from 'react'
import faker from 'faker'
import DropdownReducer from "../DropdownReducer";

const fake = ((counter = 50000) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push({
            label: faker.name.findName(),
            value: faker.name.lastName(),
        })
    }
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()
const DropDownReducerWrap = (props) => {
    const onClickItem = (value) => {
        console.log('ext onClick', value)
    }
    return <DropdownReducer data={fake} maxHeight={200} maxWidth={400} onClickItem={onClickItem}  />
}
export default DropDownReducerWrap