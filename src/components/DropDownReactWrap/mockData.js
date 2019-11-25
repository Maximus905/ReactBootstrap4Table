import faker from "faker";

const counter = 10
const genDataRU = (counter) => {
    const time = Date.now()
    console.log('start gem fake')
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push({
            label: faker.name.findName(),
            value: faker.name.lastName(),
        })
    }
    console.log('stop gen fake: ', Date.now() - time)
    return res
}

export default genDataRU(counter)
