/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import DropdownItem from "../DropdownItem"
import {DropdownContext} from "../../ContextProvider";
import {useContext, useMemo} from "react";
import {checkAll} from "../../actions";

const SelectAllBox = (props) => {
    const {bdColor, state: {data}, dispatch} = useContext(DropdownContext)
    const checkedCount = useMemo(() => data.reduce((acc, item) => item.checked ? ++acc : acc, 0), [data])
    const checked = checkedCount === data.length
    const partlyChecked = checkedCount > 0 && checkedCount < data.length
    const nextCheckStatus = () => checkedCount === 0
    return (
        <div css={css`
        border-bottom: 1px solid ${bdColor};
    `}>
            <DropdownItem checked={checked} partlyChecked={partlyChecked} onClick={() => dispatch(checkAll(nextCheckStatus()))} label="Выделить все" value="" index=""/>
        </div>
    )
}

export default SelectAllBox