/** @jsx jsx */
import {useState} from 'react'
import PropTypes from 'prop-types'
import {jsx, css} from '@emotion/core'
import {Dropdown as DropdownBs, DropdownToggle, DropdownMenu as DropdownMenuBs} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {ItemsBox} from "./ItemsBox";
import {SearchInput} from './Input'


const DropDownReact3 = (props) => {
    const {fontRatio, data, maxWidth} = props
    const [dropdownOpen, setDropdownOpen] = useState(true)
    const [filterString, setFilterString] = useState('')
    const toggle = () => setDropdownOpen(!dropdownOpen)
    const Dropdown = (props) => (
        <DropdownBs css={css`
            font-size: ${fontRatio}rem;
        `} {...props}>
            {props.children}
        </DropdownBs>
    )


    const DropdownButton = (props) => (
        <DropdownToggle css={css`
            padding: 5px !important;
        `} {...props} tag={'span'} >
            <FontAwesomeIcon icon={faBars} size={'sm'} />
        </DropdownToggle>
    )
    const DropdownMenu = (props) => (
        <DropdownMenuBs css={css`
            top: -5px !important;
            left: 5px !important;
            font-size: ${fontRatio}rem;
            padding: 0;
            max-width: ${maxWidth}px;
        `} {...props} >
            {props.children}
        </DropdownMenuBs>
    )
    return (
        <Dropdown isOpen={dropdownOpen} size={'sm'} toggle={toggle}>
            <DropdownButton/>
            <DropdownMenu>
                <SearchInput onChangeInput={setFilterString} value={filterString} />
                <ItemsBox data={data} maxHeight={200} filter={filterString} />
            </DropdownMenu>
        </Dropdown>
    )
}

DropDownReact3.propTypes = {
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
    maxWidth: PropTypes.number, //max width of all component
}
DropDownReact3.defaultProps = {
    data: [],
    valueName: 'value',
    labelName: 'label',
    checkedName: 'checked',
    onSelectAll: (selectAll) => {console.log(`select all: ${selectAll}`)},
    onCheckItem: (item) => {console.log('click on item: ', item)},
    onOpenMenu: () => {},
    onCloseMenu: () => {},
    fontRatio: 0.8,
    maxHeightItemsBox: 120,
    maxWidth: 400
}
export default DropDownReact3