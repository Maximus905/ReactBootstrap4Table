import React, {Fragment, useContext} from "react";
import SelectAllBox from "../SelectAll";
import SearchInput from "../SearchInput";
import ItemsBox from "../ItemsBox";
import {DropdownContext} from "../../ContextProvider";

const DropdownFilter = ({isEmpty, loadingState}) => (
    isEmpty || loadingState ? (
        <Fragment>
            <ItemsBox/>
        </Fragment>
    ) : (
        <Fragment>
            <SelectAllBox/>
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
)

const FilterBody = () => {
    const {loadingState, state: {data, isOpened}} = useContext(DropdownContext)
    if (!isOpened) return null
    return <DropdownFilter isEmpty={!data.length} loadingState={loadingState}  />
}
export default FilterBody
