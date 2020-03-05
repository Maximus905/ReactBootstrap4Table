import {convertDataList, convertCheckedItemsArray} from "./index";

const labelFieldName = 'lab'
const valueFieldName = 'val'
const emptyWildcard = '<empty>'
const emptyValueWildcard = ''
const trueWildcard = 'true'
const falseWildcard = 'false'

// create list from array
test('convertDataList, empty data, empty checked value', () => {
    const data = []
    const list = []
    const checkedItems = []
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test('convertDataList, empty checked value', () => {
    const data = ['v1', 'v2']
    const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}]
    const checkedItems = []
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array with '' and undefined, empty checked value ", () => {
    const data = ['v1', 'v2', '', undefined]
    const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}, {value: emptyValueWildcard, label: emptyWildcard, checked: false}]
    const checkedItems = []
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array with true and false, empty checked value", () => {
    const data = ['v1', 'v2', true, false]
    const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}, {value: true, label: trueWildcard, checked: false}, {value: false, label: falseWildcard, checked: false}]
    const checkedItems = []
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array, empty checked value", () => {
    const data = ['v1', 'v2', undefined, '', true, false]
    const list = [
        {value: 'v1', label: 'v1', checked: false},
        {value: 'v2', label: 'v2', checked: false},
        {value: emptyValueWildcard, label: emptyWildcard, checked: false},
        {value: true, label: trueWildcard, checked: false},
        {value: false, label: falseWildcard, checked: false}]
    const checkedItems = []
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array, not empty checked value 1", () => {
    const data = ['v1', 'v2', undefined, '', true, false]
    const checkedItems = ['v1']
    const list = [
        {value: 'v1', label: 'v1', checked: true},
        {value: 'v2', label: 'v2', checked: false},
        {value: emptyValueWildcard, label: emptyWildcard, checked: false},
        {value: true, label: trueWildcard, checked: false},
        {value: false, label: falseWildcard, checked: false}]
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array, not empty checked value 2", () => {
    const data = ['v1', 'v2', undefined, '', true, false]
    const checkedItems = [true]
    const list = [
        {value: 'v1', label: 'v1', checked: false},
        {value: 'v2', label: 'v2', checked: false},
        {value: emptyValueWildcard, label: emptyWildcard, checked: false},
        {value: true, label: trueWildcard, checked: true},
        {value: false, label: falseWildcard, checked: false}]
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array, not empty checked value 3", () => {
    const data = ['v1', 'v2', undefined, '', true, false]
    const checkedItems = ['']
    const list = [
        {value: 'v1', label: 'v1', checked: false},
        {value: 'v2', label: 'v2', checked: false},
        {value: emptyValueWildcard, label: emptyWildcard, checked: true},
        {value: true, label: trueWildcard, checked: false},
        {value: false, label: falseWildcard, checked: false}]
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array, not empty checked value 4", () => {
    const data = ['v1', 'v2', undefined, '', true, false]
    const checkedItems = ['', true]
    const list = [
        {value: 'v1', label: 'v1', checked: false},
        {value: 'v2', label: 'v2', checked: false},
        {value: emptyValueWildcard, label: emptyWildcard, checked: true},
        {value: true, label: trueWildcard, checked: true},
        {value: false, label: falseWildcard, checked: false}]
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
test("convertDataList, from array, not empty checked value 5", () => {
    const data = ['v1', 'v2', undefined, '', true, false]
    const checkedItems = ['v1', '', true]
    const list = [
        {value: 'v1', label: 'v1', checked: true},
        {value: 'v2', label: 'v2', checked: false},
        {value: emptyValueWildcard, label: emptyWildcard, checked: true},
        {value: true, label: trueWildcard, checked: true},
        {value: false, label: falseWildcard, checked: false}]
    expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
})
// test converting checkedItems array
test("convertCheckedItemsArray, empty array", () => {
    const checkedItems = []
    const list = []
    expect(convertCheckedItemsArray({emptyValueWildcard, checkedItems})).toEqual(list)
})
test("convertCheckedItemsArray", () => {
    const checkedItems = ['v1', 'v2', undefined, '', true, false]
    const list = ['v1', 'v2', '', true, false]
    expect(convertCheckedItemsArray({emptyValueWildcard, checkedItems})).toEqual(list)
})
