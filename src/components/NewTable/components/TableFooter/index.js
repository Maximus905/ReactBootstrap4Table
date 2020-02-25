/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import classNames from 'classnames'
import PropTypes from 'prop-types'

const TableFooter = (props) => {
    const {darkTheme} = props
    return <div className={classNames("d-flex justify-content-between align-items-center p-1", darkTheme ? "text-white bg-dark" : "bg-light")} >{props.children}</div>
}
TableFooter.propTypes = {
    darkTheme: PropTypes.bool
}
export default TableFooter