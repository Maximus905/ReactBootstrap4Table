/** @jsx jsx */

import {useState, createRef, useEffect, useRef, useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import {css, jsx} from "@emotion/core";
import {FixedSizeList as List} from "react-window"
import st from './style.module.css'
import {DropdownContext} from "../../ContextProvider";
import DropdownItem from "../DropdownItem"
import {setItemSizes, clickOnItem} from "../../actions";
import Fuse from "fuse.js";

const DropdownItemFunc = (props) => (listProps) => {
    const {style, index} = listProps
    const {data, onClick, valueFieldName, labelFieldName} = props
    const handler = () => onClick(data[index][valueFieldName], valueFieldName)
    const item = data[index]
    return (
        <div style={style}>
            <DropdownItem {...{value: item[valueFieldName], label: item[labelFieldName], checked: item.checked, onClick: handler, valueFieldName, labelFieldName}} />
        </div>
    )
}

// calculate the widest row in list
const longestRowIndex = ({data, fieldName}) => {
    const longestItem = data.reduce((acc, item, index) => {
        const length = item[fieldName].length
        return length > data[acc][fieldName].length ? index : acc
    }, 0)
    // console.log(`longest item index: ${longestItem}`)
    return longestItem
}


const ItemsBox = (props) => {
    const {state: {maxHeight, maxWidth, data, itemWidth, itemHeight, inputValue}, dispatch, onClickItem, onSelectAll, valueFieldName, labelFieldName} = useContext(DropdownContext)
    const itemRef = createRef()
    const fuseOption = {
        shouldSort: true,
        threshold: 0.15,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            labelFieldName
        ]
    }
    const fuse = useMemo(() => new Fuse(data, fuseOption), [data, fuseOption])
    useEffect(() => {
        if (!itemWidth && !itemHeight && itemRef.current && itemRef.current.offsetWidth && itemRef.current.offsetHeight) {
            const width = maxWidth && itemRef.current.offsetWidth > maxWidth ? maxWidth : itemRef.current.offsetWidth + 1
            dispatch(setItemSizes({width, height: itemRef.current.offsetHeight}))
            // console.log('ref', itemRef.current.offsetWidth, itemRef.current.offsetHeight)
        }
    }, [itemRef])

    const onClickHandler = (value, valueFieldName) => {
        dispatch(clickOnItem(value, valueFieldName))
    }

    const fuseFilter = (template) => {
        if (!template) return data
        return fuse.search(template)
    }

    // const filteredData = dataFilter(inputValue)
    const fuseFiltered = fuseFilter(inputValue)
    // calculate height of listBox depend on amount of items
    const listBoxHeight = () => {
        return !itemHeight ? maxHeight : (fuseFiltered.length * itemHeight > maxHeight ? maxHeight : fuseFiltered.length * itemHeight)
    }
    //if haven't set sizes of item for List component mount the longest item and get its sizes
    if (!itemWidth && ! itemHeight) {
        const longestItem = data[longestRowIndex({data, fieldName: labelFieldName})]
        return (
            <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                <div css={css`overflow-y: scroll`} ref={itemRef}><DropdownItem {...{value: longestItem[valueFieldName], label: longestItem[labelFieldName], checked: longestItem.checked }} /></div>
            </div>
        )
    }
    return (
         <List
             className={st.List}
             height={listBoxHeight()}
             itemCount={fuseFiltered.length}
             itemSize={itemHeight}
             width={itemWidth}
         >
             {DropdownItemFunc({data: fuseFiltered, onClick: onClickHandler, valueFieldName, labelFieldName})}
         </List>
    )
}
export default ItemsBox


