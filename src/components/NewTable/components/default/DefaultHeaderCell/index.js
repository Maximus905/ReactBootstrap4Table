/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {useContext} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import TableContext from "../../../TableContext";
import {
    setSorting,
    addSorting,
    changeFilter,
} from "../../../actions";
import Filter from "../../Filter";


const emptyList = []

const DefaultHeaderCell = ({accessor, renderSortIcon}) => {
    const {state: {filters, columnsSettings, filtersSettings, dimensions: {tBodyBoxHeight}}, dispatch, updateFilterList} = useContext(TableContext)
    const {title, sortable, filterable, width} = columnsSettings[accessor]
    const filterList = filters[accessor].list || emptyList
    const loadingState = filters[accessor].isLoading
    console.log('DefaultHeaderCell', accessor, loadingState)

    const onChangeFilterHandler = ({accessor, filterBy, type, value, selectAllState}) => {
        dispatch(changeFilter({accessor, type, value, selectAllState}))
    }
    const onOpenFilter = ({accessor}) => {
        console.log('settingFilterChanged app', accessor, filters[accessor])
        updateFilterList({accessor})
    }

    const handlerOnClick = (e) => {
        if (e.ctrlKey) {
            dispatch(addSorting(accessor))
        } else {
            dispatch(setSorting(accessor))
            // invalidateDataWithTimeout(TIMEOUT_CHANGE_SORTING)
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
                {filterable && <Filter accessor={accessor} maxWidth={300} maxHeight={tBodyBoxHeight * 0.8} data={filterList} direction="down" filterSettings={filtersSettings[accessor]} onChangeFilter={onChangeFilterHandler} onOpen={onOpenFilter} loadingState={loadingState} />}
            </div>
        </th>
    )
}

DefaultHeaderCell.propTypes = {
    accessor: PropTypes.string,
    renderSortIcon: PropTypes.func
}
export default DefaultHeaderCell