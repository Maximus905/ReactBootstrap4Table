/**@jsx jsx */
import {DropdownToggle} from "reactstrap";
import {css, jsx} from "@emotion/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const DropdownButton = (props) => (
    <DropdownToggle css={css`
            padding: 5px !important;
        `} {...props} tag={'span'} >
        <FontAwesomeIcon icon={faBars} size={'sm'} />
    </DropdownToggle>
)
export default DropdownButton
