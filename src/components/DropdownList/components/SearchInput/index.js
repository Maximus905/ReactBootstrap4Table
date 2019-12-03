/** @jsx jsx */
import {css, jsx} from "@emotion/core"
import {useContext} from 'react'
import PropTypes from 'prop-types'
import {DropdownContext} from "../../ContextProvider"
import {changeInput} from "../../actions"

const SearchInput = (props) => {
    const {state: {inputValue}, dispatch, fontRatio, bdColor} = useContext(DropdownContext)
    const onChangeHandler = (e) => dispatch(changeInput(e.target.value))
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
            `} value={inputValue} onChange={onChangeHandler} autoFocus={true} />
        </div>
    )
}

SearchInput.propTypes = {
    onChangeInput: PropTypes.func
}
SearchInput.defaultProps = {
    onChangeInput: (inputValue) => console.log('onChangeInput', inputValue)
}
export default SearchInput