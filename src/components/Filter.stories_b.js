import React, {useState} from "react"
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import Filter from "./Filter";
import {filterType} from "./TableGrid/constants/filters";
import faker from "faker";

const fakeData = ((counter = 2) => {
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
const [inputValue, setInputValue] = useState('')

const fSettingsEQ = {
    accessor: 'fake',
    type: filterType.EQ.value,
    allowedTypes: [filterType.EQ.value, filterType.LIST.value]
}
const fSettingsLIST = {
    accessor: 'fake',
    type: filterType.LIST.value,
    allowedTypes: [filterType.EQ.value, filterType.LIST.value]
}


storiesOf('Filter', module)
    .addDecorator(story => <div style={{padding: '3rem'}}>{story()}</div> )
    .add('default', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} filterSettings={fSettingsEQ} onSaveSettings={action('save settings')}  />)
    .add('opened EQ', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} filterSettings={fSettingsEQ} onSaveSettings={action('save settings')} />)
    .add('opened LIST', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} filterSettings={fSettingsLIST} onSaveSettings={action('save settings')} />)
    .add('settings all filters', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} openSettings={true} filterSettings={fSettingsEQ} onSaveSettings={action('save settings')} />)
    .add('settings custom filters', () => <Filter data={fakeData} valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={300} opened={true} openSettings={true} filterSettings={fSettingsEQ} onSaveSettings={action('save settings')} />)
