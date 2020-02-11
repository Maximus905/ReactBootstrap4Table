const DEVELOPED_BASE_URL = 'netcmdb-loc.rs.ru:8082'
const BASE_URL = (() => {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const developMode = hostname === 'localhost'
    return developMode ? `${protocol}//${DEVELOPED_BASE_URL}` : `${protocol}//${hostname}${port==='' ? '' : ':'}${port}`
})()

export const GET_DATA = `${BASE_URL}/api/tableData.json`
export const GET_FILTER_LIST = `${BASE_URL}/api/tableFilterList.json`