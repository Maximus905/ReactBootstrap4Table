import React, {useState} from "react"
import './typeDefs'
import PropTypes, {oneOfType} from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import {Dropdown as DropdownBs} from "reactstrap";
import FilterBody from "./components/FilterBody";


const DropdownList = (props) => {
    const {
        accessor,
        data, //filter list for LIST type
        loadingState, //if list for LIST filter is not ready yet
        active, // if filter value for this filter isn't empty
        maxHeight, maxWidth,
        valueFieldName,
        labelFieldName,
        checkedFieldName,
        emptyWildcard,
        emptyListWildcard,
        loadingWildcard,
        onChangeFilter: onChangeFilterExt,
        onOpen,
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
    // const [isOpen, setIsOpen] = useState(opened)


    const context = {
        ...props,
        bdColor,
    }

    return (
        <ContextProvider {...context} >
            <Dropdown {...bsProps} onClick={(e) => {
                e.stopPropagation()
            }}>
                <DropdownButton active={active} />
                <DropdownMenu modifiers={{offset}} right >
                    <FilterBody />
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
DropdownList.propTypes = {
    ...DropdownBs.propTypes,
    accessor: PropTypes.string,
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]) ),
    loadingState: PropTypes.bool,
    maxHeight: PropTypes.number, // maxHeight of filterList in px
    maxWidth: PropTypes.number, // maxWidth of filterList in px
    //handlers
    onChangeFilter: PropTypes.func, // every time when filter changes
    onOpen: PropTypes.func,
    //
    fontRatio: PropTypes.number,

    emptyWildcard: PropTypes.string,
    falseWildcard: PropTypes.bool,
    trueWildcard: PropTypes.bool,
    emptyListWildcard: PropTypes.string,
    loadingWildcard: PropTypes.string,

    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,

    opened: PropTypes.bool, //initial state of filter
}
DropdownList.defaultProps = {
    fontRatio: 0.8,
    maxWidth: 200,

    emptyWildcard: '<пусто>',
    falseWildcard: 'false',
    trueWildcard: 'true',
    emptyListWildcard: 'нет элементов',

    valueFieldName: 'val',
    labelFieldName: 'lab',
    loadingWildcard: 'loading...',
    opened: false,
    onOpen: ({accessor}) => {}
}

export default DropdownList