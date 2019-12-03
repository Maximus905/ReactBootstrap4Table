/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import {useState, useEffect} from "react";
import PropTypes from 'prop-types'

export const SearchInput = (props) => {
    const {onChangeInput, value} = props
    const [inputValue, setInputValue] = useState('')
    const fontRatio = 0.8
    const bdColor = 'rgb(206,212,218)'
    const inputHandler = e => {
        // setInputValue(e.target.value)
        onChangeInput(e.target.value)
    }
    // useEffect(() => onChangeInput(inputValue), [inputValue])

    return (
        <div css={css`
            padding: 5px;
        `} >
            <input type="text" className="form-control shadow-none" css={css`
                font-size: ${fontRatio}rem;
                padding: 0.2rem;
                padding-right: 1.2rem;
                height: calc(1.5em + 2px);
                &:focus {
                  border-color: ${bdColor};
                }
            `} value={value} onChange={inputHandler} autoFocus={true} />
        </div>
    )
}

SearchInput.propTypes = {
    onChangeInput: PropTypes.func
}
SearchInput.defaultProps = {
    onChangeInput: (inputValue) => console.log('onChangeInput', inputValue)
}