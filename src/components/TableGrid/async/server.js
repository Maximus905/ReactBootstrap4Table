import axios from 'axios'
import {REG_CENTERS_URL, LOCATIONS_URL} from '../constants/urls'

export async function getRcList(dispatch) {
    try {

        const response = await axios.get(REG_CENTERS_URL, {
            params: {filter: {'key1': 'vol1'}}
        })
        // const result = dispatch(receiveAllData(response.data.result))
        // const result = dispatch(receiveAllData({fakeData: 'test'}))
        console.log(response.data.result)
        return response.data.result
    } catch (e) {
        console.log('Error', e)
        alert('Error fetching reg centers list: ' + e.toString())
    }
}
export async function getLocationsList(filter) {
    try {

        const response = await axios.get(LOCATIONS_URL, {
            params: {filter}
        })
        console.log(response.data.result)
        return response.data.result
    } catch (e) {
        console.log('Error', e)
        alert('Error fetching locations list: ' + e.toString())
    }
}
