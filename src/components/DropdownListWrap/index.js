import React, {useState} from 'react'
import faker from 'faker'
import Filter from "../Filter";

const fake = ((counter = 10000) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push({
            label: faker.name.findName(),
            value: faker.name.lastName(),
            checked: true
        })
    }
    res.push({
        label: '',
        value: 'empty',
        checked: true
    })
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()
const fakeIp = ((counter = 100) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push({
            label: faker.internet.ip(),
            value: faker.random.number(),
            checked: true
        })
    }
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()

const DropdownListWrap = (props) => {

    const onClickItem = (value) => {
        console.log('ext onClick', value)
    }
    return <Filter data={fakeIp} maxHeight={300} maxWidth={400} onClickItem={onClickItem} />
}
export default DropdownListWrap