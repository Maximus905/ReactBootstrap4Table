/** @jsx jsx */
import {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {jsx, css} from '@emotion/core'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons'
import {ItemsBox} from "./ItemsBox";
import {SearchInput} from './Input'


const DropDownReact2 = (props) => {
    const {fontRatio, data, valueName, labelName, checkedName, onCheckItem, onSelectAll, maxHeightItemsBox} = props
    const bdColor = 'rgb(206,212,218)'

    const [dropdownOpen, setDropdownOpen] = useState(true)
    // const [selectAll, setSelectAll] = useState(false)
    //invoke external method onSelectAll
    // useEffect(() => onSelectAll(selectAll), [selectAll])

    //invoke external method onCheckItem
    // const justCheckedItem = useRef()
    // useEffect(() => {if (justCheckedItem) {
    //     onCheckItem(justCheckedItem.current)
    // }},[justCheckedItem.current])
    const toggle = () => setDropdownOpen(!dropdownOpen)
    const DropdownSm = (props) => (
        <Dropdown css={css`
            font-size: ${fontRatio}rem;
        `} {...props}>
            {props.children}
        </Dropdown>
    )


    const DropdownButton = (props) => (
        <DropdownToggle css={css`
            padding: 5px !important;
        `} {...props} tag={'span'} >
            <FontAwesomeIcon icon={faBars} size={'sm'} />
        </DropdownToggle>
    )
    const DropdownCustomMenu = (props) => (
        <DropdownMenu css={css`
            top: -5px !important;
            left: 5px !important;
            font-size: ${fontRatio}rem;
            padding: 0;
            max-width: 300px;
        `} {...props} >
            {props.children}
        </DropdownMenu>
    )
    // const ItemsBox = (props) => (
    //     <div css={css`
    //         max-height: ${maxHeightItemsBox}px;
    //         overflow-y: auto;
    //     `} {...props}>
    //         {props.children}
    //     </div>
    // )

    // const CheckIcon = (props) => (<div css={css`
    //     width: 20px;
    //     height: 20px;
    //     padding: 3px;
    //     position: absolute;
    //     left: 0.25rem;
    //     top: 0.25rem;
    //     border: 1px solid ${bdColor};
    //     border-radius: 5px;
    // `} className="d-flex justify-content-center">
    //     {props.checked ? <FontAwesomeIcon icon={faCheck} css={css`font-size: 0.8rem; color: dimgrey`} /> : false}
    // </div>)

    // const DropdownItemDiv = (props) => (
    //     <DropdownItem tag={'div'} toggle={false} css={css`
    //         outline: none;
    //         padding-left: 30px;
    //         position: relative;
    //         &:active {
    //             background-color: aqua;
    //             color: #999
    //         }
    //     `} {...props} className="text-truncate">
    //         <CheckIcon checked={props.checked} />
    //         {props.children}
    //     </DropdownItem>
    // )

    // const onClickSelectAll = () => {
    //     setData(data.map(item => ({...item, [checkedName]: !selectAll})))
    //     setSelectAll(!selectAll)
    // }
    // const SelectAllBox = (props) => (
    //     <div css={css`
    //         border-bottom: 1px solid ${bdColor};
    //     `}>
    //         <DropdownItemDiv checked={selectAll} onClick={onClickSelectAll} >Выделить все</DropdownItemDiv>
    //     </div>
    // )

    // const onClickItem = (currentItem) => () => {
    //     setData(data.map(item => {
    //         if (item[valueName] === currentItem[valueName]) {
    //             const updatedItem = {...item, [checkedName]: !item[checkedName]}
    //             justCheckedItem.current = updatedItem
    //             return updatedItem
    //         }
    //         return item
    //     }))
    // }
    // const items = () => data.map((item, index) => {
    //     const onClick = onClickItem(item)
    //     return <DropdownItemDiv checked={item[checkedName]} onClick={onClick} title={item[labelName]} key={index} >{item[labelName]}</DropdownItemDiv>
    // })
    // const filteredItems = (templ) => {
    //     const escTempl = templ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    //     return data
    //         .filter(item => (new RegExp(escTempl)).test(item[labelName]))
    //         .map((item, index) => {
    //             const onClick = onClickItem(item)
    //             return <DropdownItemDiv checked={item[checkedName]} onClick={onClick} title={item[labelName]} key={index} >{item[labelName]}</DropdownItemDiv>
    //         })
    // }
    return (
        <DropdownSm isOpen={dropdownOpen} size={'sm'} toggle={toggle}>
            <DropdownButton/>
            <DropdownCustomMenu>
                <SearchInput />
                {/*<SelectAllBox/>*/}
                <ItemsBox data={data} maxHeight={200} />
                {/*    {items()}*/}
                {/*    /!*{filteredItems(inputValue)}*!/*/}
                {/*</ItemsBox>*/}
            </DropdownCustomMenu>
        </DropdownSm>
    )
}

DropDownReact2.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    valueName: PropTypes.string,
    labelName: PropTypes.string,
    checkedName: PropTypes.string,
    onCheckItem: PropTypes.func,
    onSelectAll: PropTypes.func,
    onOpenMenu: PropTypes.func,
    onCloseMenu: PropTypes.func,
    filterFunc: PropTypes.func,
    fontRatio: PropTypes.number,
    maxHeightItemsBox: PropTypes.number,
}
DropDownReact2.defaultProps = {
    data: [],
    valueName: 'value',
    labelName: 'label',
    checkedName: 'checked',
    onSelectAll: (selectAll) => {console.log(`select all: ${selectAll}`)},
    onCheckItem: (item) => {console.log('click on item: ', item)},
    onOpenMenu: () => {},
    onCloseMenu: () => {},
    fontRatio: 0.8,
    maxHeightItemsBox: 120
}
export default DropDownReact2