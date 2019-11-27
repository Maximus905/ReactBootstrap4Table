import React from "react"
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import DropDownReact3 from "./DropDownReact3"
import faker from "faker";

const fakeData = ((counter = 150000) => {
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
    .add('default', () => <DropDownReact3 data={fakeData}  />)
