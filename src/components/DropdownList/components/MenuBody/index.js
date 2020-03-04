import React, {Fragment, useContext} from "react";
import SelectAllBox from "../SelectAll";
import SearchInput from "../SearchInput";
import ItemsBox from "../ItemsBox";
import {DropdownContext} from "../../ContextProvider";

const BodyContent = ({isEmpty, loadingState, showSelectAll}) => (
    isEmpty || loadingState ? (
        <Fragment>
            <ItemsBox/>
        </Fragment>
    ) : (
        <Fragment>
            {showSelectAll && <SelectAllBox/>}
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
)

const MenuBody = () => {
    const {loadingState, showSelectAll, state: {data, isOpened}} = useContext(DropdownContext)
    if (!isOpened) return null
    return <BodyContent isEmpty={!data.length} loadingState={loadingState} showSelectAll={showSelectAll}  />
}
export default MenuBody
