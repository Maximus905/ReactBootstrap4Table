import React from "react"
import { storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Filters from "./Filters"

export const actions = {
    testAction: action('TEST ACTION')
}
storiesOf('Filters', module)
    .addDecorator(story => <div style={{padding: '3rem'}}>{story()}</div>)
    .add('default', () => <Filters {...actions} />)
    .add('opened', () => <Filters opened={true} {...actions} />)