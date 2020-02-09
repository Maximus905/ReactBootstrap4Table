/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import DropdownItem from "../DropdownItem"
import {DropdownContext} from "../../ContextProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from '@fortawesome/free-solid-svg-icons'
import {useContext} from "react";

const EmptyList = (props) => {
    const {emptyListWildcard, bdColor, state: {selectAll, filterValue}, openSettingsMenu} = useContext(DropdownContext)
    return (
        <div className="d-flex justify-content-between align-items-center" css={css`
        border-bottom: 1px solid ${bdColor};
        padding-right: 0.5rem;
    `}>
            <DropdownItem checked={selectAll} partlyChecked={filterValue.length > 0} label={emptyListWildcard} value="" index="" showCheckIcon={false} />
            <div css={css`padding: 2px;
              border-radius: 3px;
              border: 1px solid ${bdColor}
            `} onClick={openSettingsMenu}><FontAwesomeIcon icon={faCog} css={css`font-size: 1rem; color: dimgrey`} /></div>
        </div>
    )
}

export default EmptyList