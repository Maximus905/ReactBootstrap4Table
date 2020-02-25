/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import PropTypes from 'prop-types'
import {Button as ButtonBs, Input as InputBs} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward, faFastForward, faForward, faBackward} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import classNames from 'classnames'

const IconButton = (props) => {
    const {icon, fontSize, ...rest} = props
    return <ButtonBs outline size={"sm"} css={css`padding: 0.25rem; line-height: 1; font-size: ${props.fontSize}rem; color: #b8b8b8`} {...rest}><FontAwesomeIcon icon={icon}/></ButtonBs>
}


IconButton.propTypes = {
    ...ButtonBs.propTypes,
    icon: PropTypes.any, // fa icon
    fontSize: PropTypes.number, // in rem
}
IconButton.defaultProps = {
    fontSize: 0.875
}

const DropdownList = (props) => {
    const {valueList} = props
    const {darkTheme} = props
    const base = {
        height: 'calc(1em + 0.75rem + 2px)'
    }
    const darkStyle = {
        backgroundColor: 'rgba(255,255,255,.1)',
        color: '#fff',
        '&:focus': {
            backgroundColor: 'rgba(255,255,255,.4)',
            color: '#fff',
            borderColor: '#eee',
            boxShadow: 'none'
        }
    }
    const darkOption = {
        backgroundColor: '#343a40',
        color: '#fff',
    }

    return (<InputBs type="select" css={darkTheme ? [base, darkStyle] : base} bsSize="sm">
        {valueList.map(item => <option css={darkTheme ? darkOption : ''}>{item}</option>)}
    </InputBs>)
}
DropdownList.propTypes = {
    valueList: PropTypes.array,
    darkTheme: PropTypes.bool
}
DropdownList.defaultProps = {
    valueList: [100, 300, 500],
    darkTheme: false
}


const Pagination = (props) => {
    const {startPage = 1, total = 1, rowsOnPage, darkTheme} = props
    const [current, setCurrent] = useState(
        startPage && startPage <= total ? startPage
            : 1
    )

    return <div className={classNames(
        "border rounded d-flex align-items-center justify-content-between p-1",
        darkTheme ? "text-white bg-dark border-light" : "bg-light border-dark")} css={css`width: 300px`}>
        <div>
            <IconButton icon={faFastBackward} className="mr-1" disabled />
            <IconButton icon={faBackward} />
        </div>
        <div>Page {current} of {total}</div>
        <div>
            <IconButton icon={faForward} className="mr-1" />
            <IconButton icon={faFastForward} />
        </div>
        <div>
            <DropdownList darkTheme={darkTheme}/>
        </div>
    </div>
}
Pagination.propTypes = {
    startPage: PropTypes.number,
    total: PropTypes.number,
    rowsOnPage: PropTypes.array,
    darkTheme: PropTypes.bool
}
export default Pagination