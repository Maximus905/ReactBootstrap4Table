import {GET_DATA, GET_FILTER_LIST} from "../constants";
import axios from 'axios'

export const getData = async ({filters, sorting}) => {
    const time = new Date()
    try {
        const res = await axios.get(GET_DATA, {
            params: {filters, sorting}
        })
        if (!Array.isArray(res.data.result)) {
            console.log('invalid data from server: ', res)
            throw new Error('Error fetching data from server')
        }
        console.log('fetching data time', new Date() - time)
        console.log('fetching data server time', res.data.time)

        return res.data.result
    } catch (e) {
        alert(e.toString())
        return []
    }
}
export const getFilterList = async ({accessor, filters}) => {
    try {
        const res = await axios.get(GET_FILTER_LIST, {
            params: {accessor, filters}
        })
        if (!Array.isArray(res.data.result)) {
            console.log('invalid data from server: ', res)
            throw new Error('Error fetching filter list from server')
        }
        return res.data.result
    } catch (e) {
        alert(e.toString())
        return []
    }
}