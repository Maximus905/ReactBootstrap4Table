import React, {useState, Fragment, useEffect, useContext} from "react"
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
import filterTypes from "../../constatnts/filterTypes";
import SimpleSearch from "./filters/SimpleSearch";
import TableContext from "../../TableContext";

const Filter = (props) => {
    const {
        accessor,
        data,
        maxHeight, maxWidth,
        //callbacks for drop-down filter
        onClickItem,
        onSelectAll,
        // key names for drop-down filter
        valueFieldName,
        labelFieldName,
        checkedFieldName,
        // wildcard for empty value in list
        emptyWildcard,
        // callback for text search filter
        onChangeTextSearch,
        //callbacks for setting menu
        onClickSettingsItem,
        onSaveSettings,

        fontRatio,
        opened,
        openSettings,
        filterSettings,
        ...bsProps} = props
    const {dispatch} = useContext(TableContext)
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
    const initialSettingList = filterSettings && filterSettings.allowedTypes.map(key => {
        return ({
            value: filterTypes[key].value,
            label: filterTypes[key].label,
            checked: filterTypes[key].value === filterSettings.type,
        })
    })
    const [settingList, setSettingList] = useState(initialSettingList)

    const closeSettingsMenu = () => {
        setShowSettings(false)
    }
    const openSettingsMenu = () => {
        setShowSettings(true)
    }
    const onClickSaveSettings = ((accessor) => () => {
        const newType = settingList.reduce((acc, item) => item.checked ? acc = item.value : acc, '')
        console.log('set new filter', accessor, newType)
        onSaveSettings({accessor, newType})
        closeSettingsMenu()
    })(accessor)

    useEffect(() => {
        onClickSaveSettings()
    }, [settingList])

    const onClickSettingItem = (value) => {
        setSettingList(settingList.map(item => ({...item, checked: item.value === value})))
    }
    const onChangeSimpleSearch = value => {
        console.log('onChangeSimpleSearch', accessor, value)
        onChangeTextSearch({accessor, value, append: false, remove: false})
        // dispatch(setFilterValue({accessor, value}))
    }
    const DropdownFilter = () => (
        <Fragment>
            <SelectAllBox/>
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
    const SettingsMenu = () => (
        <Fragment>
            <SettingsHeader/>
            <SettingsBox settingList={settingList} onClick={onClickSettingItem} />
        </Fragment>
    )
    const filter = () => {
        switch (filterSettings.type) {
            case 'EQ':
            case 'NE':
            case 'LT':
            case 'LE':
            case 'GT':
            case 'GE':
            case 'STARTING':
            case 'ENDING':
                return <SimpleSearch filterType={filterSettings.type} />
            case 'LIST':
                return <DropdownFilter />
            default:
                return <div>Фильтр не выбран</div>

        }
    }
    const filterContext = {
        ...props,
        bdColor,
        openSettingsMenu,
        closeSettingsMenu,
        onClickSaveSettings,
        onChangeSimpleSearch
    }
    return (
        <ContextProvider {...filterContext} >
            <Dropdown {...bsProps} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} onClick={(e) => {
                e.stopPropagation()
            }}>
                <DropdownButton/>
                <DropdownMenu modifiers={{offset}} >
                    { !showSettings && filter()}
                    { showSettings && <SettingsMenu />}
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
Filter.propTypes = {
    ...DropdownBs.propTypes,
    accessor: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    //handlers
    onChangeTextSearch: PropTypes.func,//for text search filter
    onClickItem: PropTypes.func, // for dropdown list filter: involved after click on item of filter list (last clicked item object is passed as argument)
    onSelectAll: PropTypes.func, // for dropdown list filter: SelectAll checkbox status (true|false) is passed as argument
    onClickSettingsItem: PropTypes.func, // handler for clicking on Settings menu item
    onSaveSettings: PropTypes.func, //ext handler for saving filter setting. (accessor, newType) => {}
    //
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
    opened: PropTypes.bool, //initial state of filter
    openSettings: PropTypes.bool, //initial state of filter's settings menu
    filterSettings: PropTypes.shape({
        filterBy: PropTypes.string,
        allowedTypes: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.string
    }),
}
Filter.defaultProps = {
    fontRatio: 0.8,
    emptyWildcard: '<пусто>',
    valueFieldName: 'val',
    labelFieldName: 'lab',
    checkedFieldName: 'checked',
    opened: false,
    openSettings: false,
    onChangeTextSearch: ({accessor, value}) => console.log('onChangeTextSearch', accessor, value),
    onClickItem: (item) => console.log('onClick Item', item),
    onSelectAll: (status) => console.log('onSelectAll', status),
    onClickSettingsItem: () => console.log('onClick Settings Item'),
    onSaveSettings: (accessor, newType) => console.log('onClickSaveSettings', accessor, newType)
}

export default Filter