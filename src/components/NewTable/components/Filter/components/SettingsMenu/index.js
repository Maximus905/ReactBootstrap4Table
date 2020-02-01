import React, {Fragment, useContext} from "react";
import SettingsHeader from "../SettingsHeader";
import SettingsBox from "../SettingsBox";
import {DropdownContext} from "../../ContextProvider";

const SettingsMenu = () => {
    const {settingList, onClickSettingItem} = useContext(DropdownContext)
    return (
        <Fragment>
            <SettingsHeader/>
            <SettingsBox settingList={settingList} onClick={onClickSettingItem} />
        </Fragment>
    )
}
export default SettingsMenu