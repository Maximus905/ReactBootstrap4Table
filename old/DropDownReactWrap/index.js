import React, {useState} from 'react'
import DropDownReact2 from "../DropDownReact2";
import DropDownReact3 from '../DropDownReact3'
import faker from "faker";

const fakeData = ((counter = 150000) => {
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
const DropDownReactWrap = (props) => {
    const [data, setData] = useState(mockData)
    const onClickItem = (value) => {
        setData(data.map(item => {
            return item.value === value ? {...item, 'checked': !item.checked} : item
        }))
    }
    return <DropDownReact3 data={data} />
    return <DropDownReact3 data={data} />
}
export default DropDownReactWrap