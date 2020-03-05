import React, {Fragment, useContext} from "react";
import SearchInput from "../SearchInput";
import ItemsBox from "../ItemsBox";
import DropdownContext from "../../DropdownContext";
const BodyContent = ({isEmpty, loadingState}) => (
    isEmpty || loadingState ? (
        <Fragment>
            <ItemsBox/>
        </Fragment>
    ) : (
        <Fragment>
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
)

const MenuBody = () => {
    const {loadingState, state: {data, isOpened}} = useContext(DropdownContext)
    if (!isOpened) return null
    return <BodyContent isEmpty={!data.length} loadingState={loadingState} />
}
export default MenuBody
