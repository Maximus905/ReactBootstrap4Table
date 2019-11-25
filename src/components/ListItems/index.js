import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {ListGroup, ListGroupItem, ListGroupItemText, CustomInput, Label, FormGroup, Form, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Input} from 'reactstrap'
import data from './mockData'
import css from './style.module.css'
import 'bootstrap-select/dist/css/bootstrap-select.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons'

export const ListItems = (props) => {
    return (
        <Fragment>
            <div className="bootstrap-select inner show">
                <div className={css.bsSearchBox}>
                    <Input/>
                </div>
                <div className="inner show">
                    <ul className='dropdown-menu show inner'>
                        <li className="position-relative">
                            <button type="button" className="dropdown-item" title="test">test</button>
                            <div className={css.iconBox}><FontAwesomeIcon icon={faCheck} /></div>
                        </li>
                        <li>
                            <button type="button" className="dropdown-item selected active text-truncate">test</button>
                        </li>
                        <li>
                            <button type="button" className="dropdown-item text-truncate">test</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

ListItems.propTypes = {
    data: PropTypes.arrayOf(PropTypes.Object)
}


