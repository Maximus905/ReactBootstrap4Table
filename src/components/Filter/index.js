import React, {useState, Fragment} from "react"
import './typeDefs'
import PropTypes from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import SearchInput from "./components/SearchInput"
import ItemsBox from "./components/ItemsBox"
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import SelectAllBox from "./components/SelectAll";
import {Dropdown as DropdownBs} from "reactstrap";
import SettingsBox from "./components/SettingsBox";
import SettingsHeader from "./components/SettingsHeader";
import {filterType} from "../TableGrid/constants/filters";

const Filter = (props) => {
    const {data, maxHeight, maxWidth, onClickItem, onSelectAll, onClickSettingsItem, fontRatio, valueFieldName, labelFieldName, checkedFieldName, emptyWildcard, opened, openSettings, filterSettings, ...bsProps} = props
    const bdColor = 'rgb(206,212,218)'
    const offset = {
        enabled: true,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    top: -5,
                    left: 5,
                },
            }
        }
    }

    const [isOpen, setIsOpen] = useState(opened)
    const [showSettings, setShowSettings] = useState(openSettings)
    //settings list
    const initialSettingList = filterSettings.allowedTypes.map(key => ({
        value: filterType[key].value,
        label: filterType[key].label,
        checked: filterType[key].value === filterSettings.type.value,
    }))
    const [settingList, setSettingList] = useState(initialSettingList)
    const onClickSettingItem = (value) => {
        setSettingList(settingList.map(item => ({...item, checked: item.value === value})))
    }

    const showSettingsTrigger = () => {
        setShowSettings(!showSettings)
        console.log('showSettings', showSettings)
    }
    const DropdownFilter = () => (
        <Fragment>
            <SelectAllBox/>
            <SearchInput onChangeInput={() => {console.log('test')}} />
            <ItemsBox/>
        </Fragment>
    )
    const SettingsMenu = () => (
        <Fragment>
            <SettingsHeader/>
            <SettingsBox settingList={settingList} onClick={onClickSettingItem} />
        </Fragment>
    )
    return (
        <ContextProvider {...props} bdColor={bdColor} showSettingsTrigger={showSettingsTrigger} >
            <Dropdown {...bsProps} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} onClick={(e) => {
                e.stopPropagation()
            }} >
                <DropdownButton/>
                <DropdownMenu modifiers={{offset}} >
                    { !showSettings && <DropdownFilter />}
                    { showSettings && <SettingsMenu />}
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
Filter.propTypes = {
    ...DropdownBs.propTypes,
    data: PropTypes.arrayOf(PropTypes.object),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onClickItem: PropTypes.func, // last clicked item object is passed as argument
    onSelectAll: PropTypes.func, // SelectAll checkbox status (true|false) is passed as argument
    onClickSettingsItem: PropTypes.func, // handler for clicking on Settings menu item
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
    opened: PropTypes.bool,
    openSettings: PropTypes.bool,
    filterSettings: PropTypes.shape({
        accessor: PropTypes.string,
        allowedTypes: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
            loadFromServer: PropTypes.bool
        })
    })
}
Filter.defaultProps = {
    fontRatio: 0.8,
    emptyWildcard: '<пусто>',
    valueFieldName: 'val',
    labelFieldName: 'lab',
    checkedFieldName: 'checked',
    opened: false,
    openSettings: false,
    onClickItem: (item) => {console.log('onClick Item', item)},
    onSelectAll: (status) => {console.log('onSelectAll', status)},
    onClickSettingsItem: () => {console.log('onClick Settings Item')}
}

export default Filter