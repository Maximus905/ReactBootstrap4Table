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
    const {data, onClick} = props
    const handler = () => onClick(data[index].value)
    const item = data[index]
    return (
        <div style={style}>
            <DropdownItem {...{index, value: item.value, label: item.label, checked: item.checked, onClick: handler}} />
        </div>
    )
}

// calculate the widest row in list
const longestRowIndex = ({data, fieldName}) => {
    const longestItem = data.reduce((acc, item, index) => {
        const length = item[fieldName].length
        return length > data[acc][fieldName].length ? index : acc
    }, 0)
    console.log(`longest item index: ${longestItem}`)
    return longestItem
}
const fuse = (data) => {
    const fuseOption = {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "label"
        ]
    }

}

const ItemsBox = (props) => {
    const {state: {maxHeight, maxWidth, data, itemWidth, itemHeight, inputValue}, dispatch, onClickItem} = useContext(DropdownContext)
    const itemRef = createRef()
    const fuseOption = {
        shouldSort: true,
        threshold: 0.15,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "label"
        ]
    }
    const fuse = useMemo(() => new Fuse(data, fuseOption), [data, fuseOption])
    useEffect(() => {
        if (!itemWidth && !itemHeight && itemRef.current && itemRef.current.offsetWidth && itemRef.current.offsetHeight) {
            const width = maxWidth && itemRef.current.offsetWidth > maxWidth ? maxWidth : itemRef.current.offsetWidth + 1
            dispatch(setItemSizes({width, height: itemRef.current.offsetHeight}))
            console.log('ref', itemRef.current.offsetWidth, itemRef.current.offsetHeight)
        }
    }, [itemRef])

    const onClickHandler = (value) => {
        dispatch(clickOnItem(value))
    }

    const dataFilter = (template) => {
        const start = Date.now()
        const escTempl = template.replace(/[.*+?^${}()|[\]\\]/, '\\$&')
        const res =  data.filter(item => (new RegExp(escTempl, 'i')).test(item.label))
        console.log('js filter', Date.now() - start, res)
        return res
    }
    const fuseFilter = (template) => {
        if (!template) return data
        const start = Date.now()
        const res = fuse.search(template)
        console.log('fuse filter', Date.now() - start, res.length)
        return res
    }

    // const filteredData = dataFilter(inputValue)
    const fuseFiltered = fuseFilter(inputValue)
    //if haven't set sizes of item for List component mount the longest item and get its sizes
    if (!itemWidth && ! itemHeight) {
        const longestItem = data[longestRowIndex({data, fieldName: 'label'})]
        return (
            <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                <div css={css`overflow-y: scroll`} ref={itemRef}><DropdownItem {...{value: longestItem.value, label: longestItem.label, checked: longestItem.checked }} /></div>
            </div>
        )
    }
    // console.log(dataFilter(inputValue,data))
    return (
        <List
            className={st.List}
            height={maxHeight}
            itemCount={fuseFiltered.length}
            itemSize={itemHeight}
            width={itemWidth}
        >
            {DropdownItemFunc({data: fuseFiltered, onClick: onClickHandler})}
        </List>
    )
}
ItemsBox.propTypes = {
    onClickItem: PropTypes.func,
    filter: PropTypes.string
}
ItemsBox.defaultProps = {
    onClickItem: (value) => console.log(`Click on '${value}'`),
    filter: ''
}
export default ItemsBox


