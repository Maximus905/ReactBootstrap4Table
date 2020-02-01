import React, {useState, Fragment, useEffect, useContext, useReducer} from "react"
import './typeDefs'
import PropTypes from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import SearchInput from "./components/SearchInput"
import ItemsBox from "./components/ItemsBox"
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import SelectAllBox from "./components/SelectAll";
import SettingsMenu from "./components/SettingsMenu";
import {Dropdown as DropdownBs} from "reactstrap";
import SettingsBox from "./components/SettingsBox";
import SettingsHeader from "./components/SettingsHeader";
import filterTypes from "../../constatnts/filterTypes";
import SimpleSearch from "./filters/SimpleSearch";
import TableContext from "../../TableContext";
import rootReducer from "./reducer";
import {initialState} from "./constants/initialState";
import {changeSimpleSearchInput} from "./actions";

const Filter = (props) => {
    const {
        accessor,
        data, //filter list for LIST type
        maxHeight, maxWidth,
        valueFieldName,
        labelFieldName,
        checkedFieldName,
        emptyWildcard,
        onChangeFilter: onChangeFilterExt,
        onSaveSettings: onSaveSettingsExt,
        fontRatio,
        opened,
        openSettings,
        filterSettings,
        //callbacks for drop-down filter
        // onClickItem,
        // onSelectAll,
        // key names for drop-down filter
        // wildcard for empty value in list
        // callback for text search filter
        // onChangeTextSearch, //unused. Was replaced with onChangeFilter
        //callbacks for setting menu
        // onClickSettingsItem,
        ...bsProps} = props
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
    // const initialSettingList = filterSettings && filterSettings.allowedTypes.map(key => {
    //     return ({
    //         value: filterTypes[key].value,
    //         label: filterTypes[key].label,
    //         checked: filterTypes[key].value === filterSettings.type,
    //     })
    // })
    const closeSettingsMenu = () => {
        setShowSettings(false)
    }
    const openSettingsMenu = () => {
        setShowSettings(true)
    }
//******************11*************
//     const [settingList, setSettingList] = useState(initialSettingList)
//     const onClickSaveSettings = ((accessor) => () => {
//         const newType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
//         onSaveSettingsExt({accessor, newType})
//         closeSettingsMenu()
//     })(accessor)
//
//     useEffect(() => {
//         onClickSaveSettings()
//     }, [settingList])
//
//     const onClickSettingItem = (value) => {
//         setSettingList(settingList.map(item => ({...item, checked: item.value === value})))
//     }
//*******************11e*************
    // const onChangeSimpleSearch = ({accessor, filterBy, type, value, selectAllState}) => {
    //     console.log('onChangeSimpleSearch', accessor, value)
    //     //update filter in App
    //     onChangeFilterExt({accessor, filterBy, type, value, selectAllState})
    //     // dispatch(setFilterValue({accessor, value}))
    // }
    // const onChangeFilter = ({accessor, filterBy, type, value, selectAllState}) => {
    //     // console.log('onChangeSimpleSearch', accessor, value)
    //     //update filter in App
    //     onChangeFilterExt({accessor, filterBy, type, value, selectAllState})
    // }
    const DropdownFilter = () => (
        <Fragment>
            <SelectAllBox/>
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
//***********************11*****************
//     const SettingsMenu = () => (
//         <Fragment>
//             <SettingsHeader/>
//             <SettingsBox settingList={settingList} onClick={onClickSettingItem} />
//         </Fragment>
//     )
//************************11e
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
//*************3*************
//         state,
//         dispatch,
//***************3e*********************
        bdColor,
        openSettingsMenu,
        closeSettingsMenu,
        // onChangeFilter
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
    // onChangeTextSearch: PropTypes.func,//for text search filter
    onChangeFilter: PropTypes.func, // every time when filter changes
    // onClickItem: PropTypes.func, // for dropdown list filter: involved after click on item of filter list (last clicked item object is passed as argument)
    // onSelectAll: PropTypes.func, // for dropdown list filter: SelectAll checkbox status (true|false) is passed as argument
    // onClickSettingsItem: PropTypes.func, // handler for clicking on Settings menu item
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
    // onChangeTextSearch: ({accessor, value}) => console.log('onChangeTextSearch', accessor, value),
    // onClickItem: ({accessor, item}) => console.log('onClick Item', accessor, item),
    // onSelectAll: (status) => console.log('onSelectAll', status),
    // onClickSettingsItem: () => console.log('onClick Settings Item'),
    onSaveSettings: (accessor, newType) => console.log('onClickSaveSettings', accessor, newType)
}

export default Filter