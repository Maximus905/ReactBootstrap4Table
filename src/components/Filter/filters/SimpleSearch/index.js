/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {Fragment} from 'react'
import PropTypes from 'prop-types'
import {filterType as allFilterTypes} from "../../../TableGrid/constants/filters";
import {useContext} from "react";
import {DropdownContext} from "../../ContextProvider";
import SettingsIcon from "../../components/SettingsIcon";

const SimpleSearch = ({filterType, value, onChangeValue}) => {
    const label = allFilterTypes[filterType].filterName ? allFilterTypes[filterType].filterName : allFilterTypes[filterType].label
    const {bdColor, fontRatio} = useContext(DropdownContext)
    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center" css={css`
                border-bottom: 1px solid ${bdColor};
                padding-right: 0.5rem;
            `}>
                <div css={css`
                    padding-left: 5px;
                `}>
                    <span className="font-weight-bold">{label}</span>:
                </div>
                <SettingsIcon />
            </div>

            <div css={css`
            padding: 5px;
            position: relative;
        `} className="d-flex justify-content-between align-items-center" >
                <input type="text" className="form-control shadow-none" css={css`
                font-size: ${fontRatio}rem;
                padding: 0.2rem;
                padding-right: 2rem;
                height: calc(1.5em + 2px);
                &:focus {
                  border-color: ${bdColor};
                }
            `} value={value} onChange={(e) => onChangeValue(e.target.value)} autoFocus={true} />
            </div>
        </Fragment>
    )
}
SimpleSearch.propTypes = {
    filterType: PropTypes.string,
    value: PropTypes.string,
    onChangeValue: PropTypes.func
}
SimpleSearch.defaultProps = {
    onChangeValue: (value) => console.log('onChangeValue', value)
}

export default SimpleSearch