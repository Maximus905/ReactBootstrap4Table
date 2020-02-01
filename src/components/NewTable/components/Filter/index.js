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
import SettingsMenu from "./components/SettingsMenu";
import {Dropdown as DropdownBs} from "reactstrap";
import SimpleSearch from "./filters/SimpleSearch";


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
    const closeSettingsMenu = () => {
        setShowSettings(false)
    }
    const openSettingsMenu = () => {
        setShowSettings(true)
    }

    const DropdownFilter = () => (
        <Fragment>
            <SelectAllBox/>
            <SearchInput />
            <ItemsBox/>
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
    onChangeFilter: PropTypes.func, // every time when filter changes
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
    onSaveSettings: (accessor, newType) => console.log('onClickSaveSettings', accessor, newType)
}

export default Filter