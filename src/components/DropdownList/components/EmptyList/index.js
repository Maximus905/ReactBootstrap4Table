/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import PropTypes from 'prop-types'
import DropdownItem from "../DropdownItem"
import DropdownContext from "../../DropdownContext";
import {useContext} from "react";

const EmptyList = (props) => {
    const {bdColor} = useContext(DropdownContext)
    return (
        <div className="d-flex justify-content-between align-items-center" css={css`
        border-bottom: 1px solid ${bdColor};
        padding-right: 0.5rem;
    `}>
            <DropdownItem checked={false} label={props.label} value="" index="" showCheckIcon={false} />
        </div>
    )
}

EmptyList.props = {
    label: PropTypes.string
}

export default EmptyList