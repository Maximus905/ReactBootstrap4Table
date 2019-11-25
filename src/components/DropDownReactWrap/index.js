import React, {useState} from 'react'
import DropDownReact2 from "../DropDownReact2";
import DropDownReact3 from '../DropDownReact3'
import mockData from "./mockData";

const DropDownReactWrap = (props) => {
    const [data, setData] = useState(mockData)
    const onClickItem = (value) => {
        setData(data.map(item => {
            return item.value === value ? {...item, 'checked': !item.checked} : item
        }))
    }
    return <DropDownReact3 data={data} />
}
export default DropDownReactWrap