/** @jsx jsx */

import {useState, createRef, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {css, jsx} from "@emotion/core";
import {DropdownItem as DropdownItemBs} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FixedSizeList as List} from "react-window";
import st from './style.module.css'

const bdColor = 'rgb(206,212,218)'
const CheckIcon = (props) => (<div css={css`
        width: 20px;
        height: 20px;
        padding: 3px;
        position: absolute;
        left: 0.25rem;
        top: 0.25rem;
        border: 1px solid ${bdColor};
        border-radius: 5px;
    `} className="d-flex justify-content-center">
    {props.checked ? <FontAwesomeIcon icon={faCheck} css={css`font-size: 0.8rem; color: dimgrey`} /> : false}
</div>)

const DropdownItem = ({value, label, checked, onClick}) => {
    const handler = () => onClick(value)
    const resLabel = `${value} ${label} ${label} ${label}`
    return (
        <DropdownItemBs tag={'div'} toggle={false} css={css`
            outline: none;
            padding-left: 30px;
            position: relative;
            &:active {
                background-color: aqua;
                color: #999
            }
        `} className="text-truncate" onClick={handler} title={resLabel} >
            <CheckIcon checked={checked} />
            {resLabel}
        </DropdownItemBs>
    )
}
DropdownItem.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    onClick: PropTypes.func
}
DropdownItem.defaultProps = {
    onClick: () => {}
}


const DropdownItemFunc = (props) => (listProps) => {
    const {data, onClick} = props
    const {style, index} = listProps
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
    const longestItem = data.reduce((acc, item, index) => {
        const length = item[fieldName].length
        return length > data[acc][fieldName].length ? index : acc
    }, 0)
    console.log(`longest item index: ${longestItem}`)
    return longestItem
}

export const ItemsBox = (props) => {
    const {maxHeight, maxWidth, data: dataSrc, onClickItem} = props
    const [data, setData] = useState(dataSrc)
    const [itemSize, setItemSize] = useState()
    const itemRef = createRef()
    const lastCheckedItem = useRef(null)
    useEffect(() => {
        if (! itemSize && itemRef.current && itemRef.current.offsetWidth && itemRef.current.offsetHeight) {
            const width = maxWidth && itemRef.current.offsetWidth > maxWidth ? maxWidth : itemRef.current.offsetWidth
            setItemSize({width, height: itemRef.current.offsetHeight})
            console.log('ref', itemRef.current.offsetWidth, itemRef.current.offsetHeight)
        }
    }, [itemRef])
    useEffect(() => {
        if (lastCheckedItem.current) onClickItem(lastCheckedItem.current)
    }, [lastCheckedItem.current, onClickItem]);
    
    const onClickHandler = (value) => {
        setData(data.map(item => item.value === value ? {...item, 'checked': !item.checked} : item))
        lastCheckedItem.current = value
    }
    const itemCount = dataSrc.length
    //if haven't set sizes of item for List component mount the longest item and get its sizes
    if (!itemSize) {
        const longestItem = dataSrc[longestRowIndex({data: dataSrc, fieldName: 'label'})]
        return (
            <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                <div css={css`overflow-y: scroll`} ref={itemRef}><DropdownItem {...{value: longestItem.value, label: longestItem.label, checked: longestItem.checked }} key={1} /></div>
            </div>
        )
    }
    return (
        <List
            className={st.List}
            height={maxHeight}
            itemCount={itemCount}
            itemSize={itemSize.height}
            width={itemSize.width}
        >
            {DropdownItemFunc({data, onClick: onClickHandler})}
        </List>
    )
}
ItemsBox.propTypes = {
    onClickItem: PropTypes.func
}
ItemsBox.defaultProps = {
    onClickItem: (value) => console.log(`Click on '${value}'`)
}


