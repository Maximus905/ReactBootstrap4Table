/**
 *
 * @type {{data: [], inputValue: string, itemWidth: number, itemHeight: number, longestItemIdx: number}}
 */
export const initialState = {
    data: [],
    maxHeight: 0,
    maxWidth: 0,
    inputValue: '',
    itemWidth: null,
    itemHeight: null,
    settingsOn: false,
    lastClicked: {value: null},
    checkedItems: 0,
    lastClickSelectAll: 0
}