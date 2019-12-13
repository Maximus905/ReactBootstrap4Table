/** @jsx jsx */

import {createRef, useEffect, useContext, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import {css, jsx} from "@emotion/core";
import {FixedSizeList as List} from "react-window"
import st from './style.module.css'
import {DropdownContext} from "../../ContextProvider";
import {TableContext} from "../../../TableGrid/TableContext";
import DropdownItem from "../DropdownItem"
import {setSettingsItemSizes, clickOnItem} from "../../actions";
import {filterType} from "../../../TableGrid/constants/filters";

const DropdownItemFunc = (props) => (listProps) => {
    const {style, index} = listProps
    const {data, onClick} = props
    const handler = () => onClick(data[index].value)
    const item = data[index]
    return (
        <div style={style}>
            <DropdownItem {...{value: item.value, label: item.label, checked: item.checked, onClick: handler}} />
        </div>
    )
}

// calculate the widest row in list
const longestRowIndex = ({data, fieldName}) => {
    return data.reduce((acc, item, index) => {
        const length = item[fieldName].length
        return length > data[acc][fieldName].length ? index : acc
    }, 0)
}


const SettingsBox = (props) => {
    const {settingList, onClick} = props
    const {state: {maxHeight, maxWidth, settingItemWidth, settingItemHeight, }, dispatch, filterSettings} = useContext(DropdownContext)
    // const initialSettingList = filterSettings.allowedTypes.map(key => ({
    //     value: filterType[key].value,
    //     label: filterType[key].label,
    //     checked: filterType[key].value === filterSettings.type.value,
    // }))
    // const [settingList, setSettingList] = useState(initialSettingList)

    console.log('settingList', filterSettings)
    const itemRef = createRef()

    useEffect(() => {
        if (!settingItemWidth && !settingItemHeight && itemRef.current && itemRef.current.offsetWidth && itemRef.current.offsetHeight) {
            const width = maxWidth && itemRef.current.offsetWidth > maxWidth ? maxWidth : itemRef.current.offsetWidth + 1
            dispatch(setSettingsItemSizes({width, height: itemRef.current.offsetHeight}))
        }
    }, [itemRef])

    // const onClickHandler = (value) => {
    //     setSettingList(settingList.map(item => ({...item, checked: item.value === value})))
    //     // dispatch(clickOnItem(value))
    // }

    // calculate height of listBox depend on amount of items
    const listBoxHeight = () => {
        return !settingItemHeight ? maxHeight : (settingList.length * settingItemHeight > maxHeight ? maxHeight : settingList.length * settingItemHeight)
    }
    //if haven't set sizes of item for List component mount the longest item and get its sizes
    if (!settingItemWidth && ! settingItemHeight) {
        const longestItem = settingList[longestRowIndex({data: settingList, fieldName: 'label'})]
        return (
            <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                <div css={css`overflow-y: scroll`} ref={itemRef}><DropdownItem {...{value: longestItem.value, label: longestItem.label, checked: longestItem.checked }} /></div>
            </div>
        )
    }

    return (
         <List
             className={st.List}
             height={listBoxHeight()}
             itemCount={settingList.length}
             itemSize={settingItemHeight}
             width={settingItemWidth}
         >
             {DropdownItemFunc({data: settingList, onClick})}
         </List>
    )
}
SettingsBox.propTypes = {
    settingList: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    })),
    onClick: PropTypes.func
}
export default SettingsBox


