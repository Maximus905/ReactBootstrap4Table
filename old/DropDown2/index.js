/** @jsx jsx */
import React from 'react'
import {Input} from "reactstrap";
import {jsx, css} from '@emotion/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons'


const DropDown2 = (props) => {
    const CustomInput = (props) => (
        <div css={css`
            padding: 5px;
        `} {...props} >
            <Input/>
        </div>
    )
    return (
        <div className="dropdown">
            <FontAwesomeIcon icon={faBars} size={'sm'} id={"dropdownMenuButton"}  />
            {/*<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"*/}
            {/*        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
            {/*    Dropdown button*/}
            {/*</button>*/}
            <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                <CustomInput />
                <div className="show">
                    <a role="option" aria-selected="false" className="dropdown-item" >Action</a>
                    <a role="option" aria-selected="false" className="dropdown-item" >Another action</a>
                    <a role="option" aria-selected="false" className="dropdown-item" >Something else here</a>
                </div>
            </div>

        </div>
    )
}

export default DropDown2