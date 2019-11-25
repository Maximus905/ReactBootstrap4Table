import { configure, addParameters, addDecorator } from '@storybook/react';
import {themes} from '@storybook/theming'
import '@storybook/addon-console'
import {withConsole} from '@storybook/addon-console'
import 'bootstrap/dist/css/bootstrap.css'

addParameters({
    options: {
        theme: themes.dark
    }
})
addDecorator((storyFn, context) => withConsole()(storyFn)(context))
const req = require.context('../src', true, /\.stories\.js$/)

function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);