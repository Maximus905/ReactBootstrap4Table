/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import DropdownItem from "../DropdownItem"
import {DropdownContext} from "../../ContextProvider";
import {useContext, useMemo} from "react";
import {clickOnSelectAll} from "../../actions";

const SelectAllBox = (props) => {
    const {bdColor, state: {selectAll, filterValue}, dispatch} = useContext(DropdownContext)
    const selectAllHandler = () => {
        dispatch(clickOnSelectAll())
    }
    return (
        <div className="d-flex align-items-center" css={css`
        border-bottom: 1px solid ${bdColor};
        padding-right: 0.5rem;
    `}>
            <DropdownItem checked={selectAll} partlyChecked={filterValue.length > 0} onClick={selectAllHandler} label="Выделить все" value="" index=""/>
        </div>
    )
}

export default SelectAllBox