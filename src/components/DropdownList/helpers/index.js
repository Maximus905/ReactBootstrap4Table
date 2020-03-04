import check from "check-types";

export const reopenFilterSetter = ({reopen, isOpened}) => {
    if (!reopen && isOpened) {
        return {reopen: true, isOpened: false}
    } else if (reopen && !isOpened){
        return {reopen: false, isOpened: true}
    }
}

// function for convert input data of filter list into format {value, label, checked}
function createListFromArrayOfObjects({data, labelFieldName, valueFieldName, emptyWildcard, trueWildcard, falseWildcard, selectAll, filterValue = []}) {
    return data.map(item => {
        switch(item[labelFieldName]) {
            case undefined:
                return {value: item[valueFieldName], label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAll : selectAll}
            case null:
                return {value: item[valueFieldName], label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAll : selectAll}
            case '':
                return {value: item[valueFieldName], label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAll : selectAll}
            case true:
                return {value: item[valueFieldName], label: trueWildcard, checked: filterValue.includes(trueWildcard) ? !selectAll : selectAll}
            case false:
                return {value: item[valueFieldName], label: falseWildcard, checked: filterValue.includes(falseWildcard) ? !selectAll : selectAll}
            default:
                return {value: item[valueFieldName], label: item[labelFieldName], checked: filterValue.includes(item[valueFieldName]) ? !selectAll : selectAll}
        }
    })
}

function createListFromArray({data, emptyWildcard, trueWildcard, falseWildcard, selectAll, filterValue = []}) {
    return data.map(item => {
        switch(item) {
            case undefined:
                return {value: emptyWildcard, label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAll : selectAll}
            case null:
                return {value: emptyWildcard, label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAll : selectAll}
            case '':
                return {value: emptyWildcard, label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAll : selectAll}
            case true:
                return {value: trueWildcard, label: trueWildcard, checked: filterValue.includes(trueWildcard) ? !selectAll : selectAll}
            case false:
                return {value: falseWildcard, label: falseWildcard, checked: filterValue.includes(falseWildcard) ? !selectAll : selectAll}
            default:
                return {value: item, label: item, checked: filterValue.includes(item) ? !selectAll : selectAll}
        }
    })
}

export function convertDataList ({data, labelFieldName, valueFieldName, emptyWildcard, trueWildcard, falseWildcard,  selectAll, filterValue}) {
    if (data.length === 0) return data
    const testItem = data[0]
    if (check.object(testItem)) {
        return createListFromArrayOfObjects({data, labelFieldName, valueFieldName, emptyWildcard, trueWildcard, falseWildcard, selectAll, filterValue})
    } else {
        return createListFromArray({data, emptyWildcard, trueWildcard, falseWildcard, selectAll, filterValue})
    }
}