import React, {Fragment, useContext} from "react";
import SelectAllBox from "../SelectAll";
import SearchInput from "../SearchInput";
import ItemsBox from "../ItemsBox";
import SimpleSearch from "../../filters/SimpleSearch";
import {DropdownContext} from "../../ContextProvider";

const DropdownFilter = () => (
    <Fragment>
        <SelectAllBox/>
        <SearchInput />
        <ItemsBox/>
    </Fragment>
)

const FilterBody = () => {
    const {state: {settingList}} = useContext(DropdownContext)
    const filterType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
    switch (filterType) {
        case 'EQ':
        case 'NE':
        case 'LT':
        case 'LE':
        case 'GT':
        case 'GE':
        case 'STARTING':
        case 'ENDING':
            return <SimpleSearch filterType={filterType} />
        case 'LIST':
            return <DropdownFilter />
        default:
            return <div>Фильтр не выбран</div>
    }
}
export default FilterBody
