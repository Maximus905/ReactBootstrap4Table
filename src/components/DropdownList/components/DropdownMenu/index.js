/**@jsx jsx*/
import {DropdownMenu as DropdownMenuBs} from "reactstrap"
import {css, jsx} from "@emotion/core"
import {DropdownContext} from "../../ContextProvider";
import {useContext} from "react";

const DropdownMenu = (props) => {
    const {fontRatio, state: {maxWidth}} = useContext(DropdownContext)
    return (
        <DropdownMenuBs css={css`
            font-size: ${fontRatio}rem;
            padding: 0;
            max-width: ${maxWidth}px;
        `} {...props} >
            {props.children}
        </DropdownMenuBs>
    )
}
DropdownMenu.propTypes = {
    ...DropdownMenuBs.propTypes
}
export default DropdownMenu
