import React, {useState, useRef, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Manager, Reference, Popper} from 'react-popper'
import classNames from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import css from './style.module.css'
import {Input} from "reactstrap";
import {ListItems} from "../ListItems";
import Filters from "../Filters";
import FilterContent from "../FilterContent";

const DropDown = (props) => {
    const {style, classes} = props
    const [visible, setVisible] = useState(props.opened)
    const [settingsTabActive, setSettingsTabActive] = useState(props.openSettingTab)
    const settingsOn = () => setSettingsTabActive(true)
    const filterOn = () => setSettingsTabActive(false)
    const onClickHandler = (e) => {
        e.stopPropagation()
        setVisible(!visible)
    }
    const popperOnBlur = (e) => {
        console.log('onBlur')
        setVisible(!visible)
    }
    const popperOnClick = (e) => {
        e.stopPropagation()
    }
    return (
        <Manager>
            <Reference>
                {({ref}) => (
                    <div tabIndex={0} style={{...style, width: '20px', opacity: 0.5}}  className={classNames('d-flex', 'justify-content-around', 'align-items-top', classes)} onClick={onClickHandler}  ref={ref}>
                        <FontAwesomeIcon icon={faBars} size={'sm'} />
                    </div>
                )}
            </Reference>
            <Popper placement="bottom-start" innerRef={el => el.focus()}  >
                {({ref, style, placement, arrowProps}) => {
                    return visible ? (<div ref={ref} style={{...style }} className={css.outlineDisable}
                                 data-placement={placement}  tabIndex={0} onClick={popperOnClick} onBlur={popperOnBlur}>
                        <FilterContent {...{settingsOn, filterOn, settingsTabActive}} />
                    </div>) : ''
                }}
            </Popper>
        </Manager>
    )
}
DropDown.propTypes = {
    opened: PropTypes.bool,
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}
DropDown.defaultProps = {
    opened: false
}
export default DropDown

