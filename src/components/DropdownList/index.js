import React, {useState} from "react"
import './typeDefs'
import PropTypes, {oneOfType} from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import MenuBody from "./components/MenuBody";


const DropdownList = (props) => {
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
    const context = {
        ...props,
        bdColor,
    }
    return (
        <ContextProvider {...context} >
            <Dropdown onClick={(e) => {
                e.stopPropagation()
            }} >
                <DropdownButton active={props.active} icon={props.buttonIcon}/>
                <DropdownMenu right modifiers={offset}>
                    <MenuBody />
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
DropdownList.propTypes = {
    // ...DropdownBs.propTypes,
    multiSelect: PropTypes.bool,
    accessor: PropTypes.string,
    selected: PropTypes.array,
    rightAlignment: PropTypes.bool, // right alignment if true, else left alignment
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.bool]) ),
    loadingState: PropTypes.bool,
    maxHeight: PropTypes.number, // maxHeight of dropdown list in px
    maxWidth: PropTypes.number, // maxWidth of dropdown list in px
    minWidth: PropTypes.number, //minWidth of dropdown list
    //handlers
    onChangeSelected: PropTypes.func, // every time when filter changes
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    //
    fontRatio: PropTypes.number,

    emptyWildcard: PropTypes.string,
    emptyValueWildcard: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    falseWildcard: PropTypes.string,
    trueWildcard: PropTypes.string,
    emptyListWildcard: PropTypes.string,
    loadingWildcard: PropTypes.string,

    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,

    opened: PropTypes.bool, //initial state of filter

    buttonIcon: PropTypes.any
}
DropdownList.defaultProps = {
    data: [],
    selected: [],
    fontRatio: 0.8,
    maxWidth: 200,

    rightAlignment: true,

    emptyWildcard: '<пусто>',
    emptyValueWildcard: '',
    falseWildcard: 'false',
    trueWildcard: 'true',
    emptyListWildcard: 'нет элементов',

    loadingWildcard: 'loading...',
    opened: false,
    onOpen: ({accessor}) => console.log('onOpen'),
    onClose: ({accessor}) => console.log('onClose'),
    onChangeSelected: ({accessor, value}) => {console.log('onChangeSelected', {accessor, value})}
}

export default DropdownList