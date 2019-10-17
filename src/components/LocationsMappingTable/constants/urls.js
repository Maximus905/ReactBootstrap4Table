const DEVELOPED_BASE_URL = 'netcmdb-loc.rs.ru:8082'
const BASE_URL = (() => {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const developMode = hostname === 'localhost'
    return developMode ? `${protocol}//${DEVELOPED_BASE_URL}` : `${protocol}//${hostname}${port==='' ? '' : ':'}${port}`
})()
export const REG_CENTERS_URL = `${BASE_URL}/api/getRegCenters.json`
export const ROOMS_1C_URL = `${BASE_URL}/api/get1cRooms.json`
export const LOCATIONS_URL = `${BASE_URL}/api/getLocations.json`

console.log("BASE API URL", BASE_URL)