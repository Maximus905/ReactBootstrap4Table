/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {Input} from "reactstrap"
import PropTypes from 'prop-types'

const GlobalSearch = (props) => {
    const {darkTheme} = props
    const base = {
        height: 'calc(1em + 0.75rem + 2px)'
    }
    const darkStyle = {
        backgroundColor: 'rgba(255,255,255,.1)',
        color: '#fff',
        '&:focus': {
            backgroundColor: 'rgba(255,255,255,.4)',
            borderColor: '#eee',
            boxShadow: 'none'
        }
    }
    const lightStyle = {
        backgroundColor: 'rgba(255,255,255,.1)',
        color: '#272727',
        borderColor: '#434343',
        '&:focus': {
            backgroundColor: 'rgba(255,255,255,.4)',
            borderColor: '#434343',
            boxShadow: 'none'
        }
    }
    // return <div ><Input css={darkTheme ? [base, darkStyle] : [base, lightStyle]} /></div>
    return <div ><Input className={darkTheme ? "text-white border-light" : "border-dark"} css={darkTheme ? [base, darkStyle] : [base]} /></div>
}
GlobalSearch.propTypes = {
    darkTheme: PropTypes.bool
}
export default GlobalSearch
