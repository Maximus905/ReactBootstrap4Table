import React, {useState} from "react"
import PropTypes from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import SearchInput from "./components/SearchInput"
import ItemsBox from "./components/ItemsBox"
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton";

const DropdownReducer = (props) => {
    const [isOpen, setIsOpen] = useState(true)
        return (
        <ContextProvider {...props}>
            <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} >
                <DropdownButton/>
                <DropdownMenu >
                    <SearchInput onChangeInput={() => {console.log('test')}}/>
                    <ItemsBox/>
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
DropdownReducer.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onClickItem: PropTypes.func,
    fontRatio: PropTypes.number
}
DropdownReducer.defaultProps = {
    fontRatio: 0.8
}

export default DropdownReducer