/**
 * @type {DropDownStateShape} initialState
 */
export const initialState = {
    data: [],
    selectAll: true,
    maxHeight: 0,
    maxWidth: 0,
    inputValue: '',
    itemWidth: null,
    itemHeight: null,
    settingItemWidth: null,
    settingItemHeight: null,
    settingsOn: false,
    lastClicked: {value: null, checked: false}, // for saving last clicked item from list
    lastChosenSetting: {value: null}, // for saving last clicked settings item from list
    checkedItems: 0,
    lastClickSelectAll: 0,
    simpleSearchInputValue: ''
}