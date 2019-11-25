import axios from 'axios'
import {REG_CENTERS_URL, LOCATIONS_URL} from '../constants/urls'

export async function getRcList() {
    try {

        const response = await axios.get(REG_CENTERS_URL, {
            params: {filter: {'key1': 'vol1'}}
        })
        console.log('rc list', response.data.result)
        return response.data.result
    } catch (e) {
        console.log('Error', e)
        alert('Error fetching reg centers list: ' + e.toString())
    }
}

export async function getDataRemote(filter, sorting) {
    try {
        console.log('send request')
        const response = await axios.get(LOCATIONS_URL, {
            params: {filter, sorting}
        })
        return response.data.result
    } catch (e) {
        console.log('Error', e)
        alert('Error fetching locations list: ' + e.toString())
    }
}
