/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import React, {useContext} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import TableContext from "../../../TableContext";
import {
    setSorting,
    addSorting,
    setFilterType,
} from "../../../actions";
import Filter from "../../Filter";
import faker from "faker";
import {TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE, TIMEOUT_CHANGE_SORTING} from "../../../constatnts/timouts";

const fake = ((counter = 1000) => {
    const time = Date.now()
    faker.locale = 'ru'
    const res = []
    for ( let i = 0; i < counter; i++ ) {
        res.push({
            lab: faker.name.findName(),
            val: faker.name.lastName(),
            checked: true
        })
    }
    res.push({
        lab: '',
        val: 'empty',
        checked: true
    })
    console.log('fake data has been generated: ', Date.now() - time)
    return res
})()

const DefaultHeaderCell = ({accessor, renderSortIcon}) => {
    const {state: {columnsSettings, filtersSettings, dimensions: {tBodyBoxHeight}}, dispatch, invalidateDataWithTimeout} = useContext(TableContext)
    const {title, sortable, filterable, width} = columnsSettings[accessor]

    const onChangeFilterType = ({accessor, newType}) => {
        // console.log('onChangeFilterType', accessor, newType)
        dispatch(setFilterType({accessor, type: newType}))
    }

    const onChangeFilterHandler = ({accessor, filterBy, type, value, selectAllState}) => {
        console.log('onChangeFilterHandler', accessor, filterBy, type, value, selectAllState)
    }
    const handlerOnClick = (e) => {
        if (e.ctrlKey) {
            dispatch(addSorting(accessor))
        } else {
            dispatch(setSorting(accessor))
            invalidateDataWithTimeout(TIMEOUT_CHANGE_SORTING)
        }
    }
    return (
        <th css={css`width: ${width}px; cursor: default`} className='align-top' onClick={sortable ? handlerOnClick : undefined} >
            <div className={classNames('d-flex', 'justify-content-between')}>
                <div className={classNames('d-flex', 'justify-content-start')}>
                    {title}
                    <div css={css`margin-left: 5px; width: 25px; opacity: 0.5`} className={classNames('d-flex', 'justify-content-around', 'align-items-center')}>
                        {sortable ? renderSortIcon(accessor) : undefined}
                    </div>
                </div>
                {filterable && <Filter accessor={accessor} maxWidth={300} maxHeight={tBodyBoxHeight * 0.8} data={fake} direction="down" filterSettings={filtersSettings[accessor]} onSaveSettings={onChangeFilterType} onChangeFilter={onChangeFilterHandler} />}
            </div>
        </th>
    )
}

DefaultHeaderCell.propTypes = {
    accessor: PropTypes.string,
    renderSortIcon: PropTypes.func
}
export default DefaultHeaderCell