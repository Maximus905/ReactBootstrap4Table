import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Manager, Reference, Popper} from 'react-popper'
import classNames from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSortAlphaDown, faSort, faSortDown, faBars } from '@fortawesome/free-solid-svg-icons'

export const DropDown = (props) => {
    const {style, classes} = props
    const [visible, setVisible] = useState(false)
    const onClickHandler = (e) => {
        e.stopPropagation()
        setVisible(!visible)
    }
    const onBlurHandler = (e) => {
        setVisible(false)
    }
    return (
        <Manager>
            <Reference>
                {({ref}) => (
                    <div tabIndex={0} style={{...style, width: '20px', opacity: 0.5}}  className={classNames('d-flex', 'justify-content-around', 'align-items-top', classes)} onClick={onClickHandler} onBlur={onBlurHandler} ref={ref}>
                        <FontAwesomeIcon icon={faBars} size={'sm'}/>
                    </div>

                )}
            </Reference>
            <Popper placement="bottom-start">
                {({ref, style, placement, arrowProps}) => {
                    return visible ? (<div ref={ref} style={{...style, height: '50px', backgroundColor: 'green'}}
                                 data-placement={placement}>
                        Popper element
                    </div>) : ''
                }}
            </Popper>
        </Manager>
    )
}
DropDown.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}

