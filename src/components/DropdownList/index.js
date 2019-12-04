import React, {useState} from "react"
import PropTypes from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import SearchInput from "./components/SearchInput"
import ItemsBox from "./components/ItemsBox"
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import SelectAllBox from "./components/SelectAll";
import {Dropdown as DropdownBs} from "reactstrap";
const DropdownList = (props) => {
    const {data, maxHeight, maxWidth, onClickItem, onSelectAll, fontRatio, valueFieldName, labelFieldName, checkedFieldName, emptyWildcard, ...bsProps} = props
    const bdColor = 'rgb(206,212,218)'
    const offset = {
        enabled: true,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    top: -5,
                    left: 5,
                },
            }
        }
    }

    const [isOpen, setIsOpen] = useState(false)
        return (
        <ContextProvider {...props} bdColor={bdColor} >
            <Dropdown {...bsProps} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} onClick={(e) => {
                e.stopPropagation()
            }} >
                <DropdownButton/>
                <DropdownMenu modifiers={{offset}} >
                    <SelectAllBox/>
                    <SearchInput onChangeInput={() => {console.log('test')}}/>
                    <ItemsBox/>
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
DropdownList.propTypes = {
    ...DropdownBs.propTypes,
    data: PropTypes.arrayOf(PropTypes.object),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onClickItem: PropTypes.func, // last clicked item object is passed as argument
    onSelectAll: PropTypes.func, // SelectAll checkbox status (true|false) is passed as argument
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
}
DropdownList.defaultProps = {
    fontRatio: 0.8,
    emptyWildcard: '<пусто>',
    valueFieldName: 'val',
    labelFieldName: 'lab',
    checkedFieldName: 'checked',
    onClickItem: (item) => {console.log('onClick Item', item)},
    onSelectAll: (status) => {console.log('onSelectAll', status)}
}

export default DropdownList