import React from "react"
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import Filter from "./Filter";
import {filterType} from "./TableGrid/constants/filters";
import faker from "faker";

const fakeData = ((counter = 15000) => {
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
const fakeFilterSettings = {
    accessor: 'fake',
    type: filterType.EQ,
    allowedTypes: Object.keys(filterType)
}
const fakeFilterSettings2 = {
    accessor: 'fake',
    type: filterType.EQ,
    allowedTypes: [filterType.EQ.value, filterType.ONE_OF.value]
}

storiesOf('Filter', module)
    .addDecorator(story => <div style={{padding: '3rem'}}>{story()}</div> )
    .add('default', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} filterSettings={fakeFilterSettings} />)
    .add('opened', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} filterSettings={fakeFilterSettings} />)
    .add('settings all filters', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} openSettings={true} filterSettings={fakeFilterSettings} />)
    .add('settings custom filters', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} openSettings={true} filterSettings={fakeFilterSettings2} />)
