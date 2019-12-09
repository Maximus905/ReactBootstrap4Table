import React from "react"
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import DropdownList from "./DropdownList";
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

storiesOf('DropDownReact3', module)
    .addDecorator(story => <div style={{padding: '3rem'}}>{story()}</div> )
    .add('default', () => <DropdownList data={fakeData}  valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={400} />)
    .add('opened', () => <DropdownList data={fakeData}  valueFieldName="value" labelFieldName="label" maxWidth={300} maxHeight={400} opened={true} />)
