/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {DropdownItem as DropdownItemBs} from "reactstrap";
import {useContext} from "react";
import {DropdownContext} from "../../ContextProvider";
import SaveIcon from "../SaveIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-regular-svg-icons"

const SettingsHeader = () => {
    const {bdColor, state, dispatch, fontRatio, showSettingsTrigger} = useContext(DropdownContext)
    const handler = () => {
        showSettingsTrigger()
        console.log('icon click')
    }
    return (
        <div className="d-flex justify-content-between align-content-center"  css={css`
            padding-right: 0.5rem;
            border-bottom: 1px solid ${bdColor};
        `}>
            <div className="dropdown-item" css={css`padding-left: 30px`}>Тип фильтра</div>
            <SaveIcon onClick={showSettingsTrigger} />
        </div>
    )
}
export default SettingsHeader