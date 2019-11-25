### How to install Storybook for React project

* **Install as devDependencies:**
  * @storybook/addon-actions
  * @storybook/addon-console
  * @storybook/addon-links
  * @storybook/addon-notes
  * @storybook/addons
  * @storybook/cli
  * @storybook/react
  * init
  * sb
```javascript
yarn add -D @storybook/cli sb init --type react
yarn add -D @storybook/react @storybook/addons @storybook/addon-actions @storybook/addon-console @storybook/addon-links @storybook/addon-notes @storybook/theming
```
* **create file ".storybook/config.js" in the root of project:**
```javascript
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
```
* **create file ".storybook/addon.js" in the root of project:**
```javascript
import '@storybook/addon-actions/register';
```
* **change file package.json by adding command in the 'scripts' section `"storybook": "start-storybook" `**
```
...
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "storybook": "start-storybook"
  },
...
```
* **command to start storybook: `yarn run storybook`**

### Example file for story
* **path of this file is:**  /src/components
```javascript
import React from "react"
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import DropDownReact3 from "./DropDownReact3"
import faker from "faker";

const fakeData = ((counter = 50) => {
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
})()

storiesOf('DropDownReact3', module)
    .addDecorator(story => <div style={{padding: '3rem'}}>{story()}</div> )
    .add('default', () => <DropDownReact3 data={fakeData}  />)
```

* **start storybook: `yarn run storybook`**

