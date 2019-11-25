/** @jsx jsx */

import {useState} from 'react'
import PropTypes from 'prop-types'
import {css, jsx} from "@emotion/core";
import {DropdownItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const bdColor = 'rgb(206,212,218)'
const CheckIcon = (props) => (<div css={css`
        width: 20px;
        height: 20px;
        padding: 3px;
        position: absolute;
        left: 0.25rem;
        top: 0.25rem;
        border: 1px solid ${bdColor};
        border-radius: 5px;
    `} className="d-flex justify-content-center">
    {props.checked ? <FontAwesomeIcon icon={faCheck} css={css`font-size: 0.8rem; color: dimgrey`} /> : false}
</div>)

const DropdownItemDiv = (props) => {
    const {item: {value, label, checked}, onClick} = props
    const handler = () => onClick(value)
    return (
        <DropdownItem tag={'div'} toggle={false} css={css`
            outline: none;
            padding-left: 30px;
            position: relative;
            &:active {
                background-color: aqua;
                color: #999
            }
        `} className="text-truncate" onClick={handler}>
            <CheckIcon checked={checked} />
            {label}
        </DropdownItem>
    )
}



export const ItemsBox = (props) => {
    const {maxHeight, data: dataSrc, onClickItem} = props
    const [data, setData] = useState(dataSrc)
    const onClickHandler = (value) => {
        setData(data.map(item => item.value === value ? {...item, 'checked': !item.checked} : item))
    }

    const items = data.map((item, index) => {
        // return (<DropdownItemDiv item={item} onClick={onClickHandler} key={index} />)
        return (<DropdownItemDiv item={item} onClick={onClickHandler} key={index} />)
    })
    return (
        <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto; 
        `}>
            {items}
        </div>
    )
}

ItemsBox.propTypes = {
    maxHeight: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    onClickItem: PropTypes.func,

}
ItemsBox.defaultProps = {
    onClickItem: (item) => {console.log('click on item: ', item)},

}

