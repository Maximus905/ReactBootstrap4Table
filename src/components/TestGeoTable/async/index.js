import {GET_DATA, GET_FILTER_LIST} from "../constants";
import axios from 'axios'

export const getData = async ({filters, sorting}) => {
    try {
        const res = await axios.get(GET_DATA, {
            params: {filters, sorting}
        })
        // console.log('getData data', res.data.result)
        return res.data.result
    } catch (e) {
        console.log('Error', e)
        alert('Error fetching reg centers list: ' + e.toString())
    }
}
export const getFilterList = async ({accessor, filters}) => {
    try {
        const res = await axios.get(GET_FILTER_LIST, {
            params: {accessor, filters}
        })
        // console.log('getData filterList', res.data.result)
        return res.data.result
    } catch (e) {
        console.log('Error', e)
        alert('Error fetching reg centers list: ' + e.toString())
    }
}