import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Button, Popover, PopoverHeader, PopoverBody, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, CustomInput} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCogs, faFilter } from '@fortawesome/free-solid-svg-icons'
import {ListItems, ListItems2, ListItems3} from "../ListItems";
import classNames from "classnames";
import FilterContent from "../FilterContent";

const Filters = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [settingsTabActive, setSettingsTabActive] = useState(props.openSettingTab)
    const togglePopover = () => {
        setPopoverOpen(!popoverOpen)
    }
    const settingsOn = () => setSettingsTabActive(true)
    const filterOn = () => setSettingsTabActive(false)
    const onClickHandler = (e) => {
        e.stopPropagation()
    }
    useEffect(() => setPopoverOpen(props.opened), [])

    return (
        <div>
            <FontAwesomeIcon icon={faBars} size={'sm'} id={props.accessor} onClick={onClickHandler} />
            <Popover placement="bottom-start" isOpen={popoverOpen} target={props.accessor} toggle={togglePopover} trigger="legacy" hideArrow={true} onClick={onClickHandler} >
                <PopoverBody  style={{paddingLeft: 0, paddingRight: 0}}>
                    <FilterContent {...{settingsOn, filterOn, settingsTabActive}} />
                </PopoverBody>
            </Popover>
        </div>
    )
}

Filters.propTypes = {
    accessor: PropTypes.string,
    opened: PropTypes.bool,
    openSettingTab: PropTypes.bool
}
Filters.defaultProps = {
    opened: false,
    openSettingTab: false
}

export default Filters