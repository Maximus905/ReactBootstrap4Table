/**@jsx jsx */
import {DropdownItem as DropdownItemBs} from "reactstrap";
import {css, jsx} from "@emotion/core";
import PropTypes from "prop-types";
import CheckIcon from "../CheckIcon";
import {DropdownContext} from "../../ContextProvider";
import {useContext} from "react";

const DropdownItem = ({value, label, checked, onClick}) => {
    const resLabel = `${label}`

    return (
        <DropdownItemBs tag={'div'} toggle={false} css={css`
            outline: none;
            padding-left: 30px;
            position: relative;
            &:active {
                background-color: aqua;
                color: #999
            }
        `} className="text-truncate" onClick={() => onClick(value)} title={resLabel} >
            <CheckIcon checked={checked} />
            {resLabel}
        </DropdownItemBs>
    )
}
DropdownItem.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    onClick: PropTypes.func
}
export default DropdownItem