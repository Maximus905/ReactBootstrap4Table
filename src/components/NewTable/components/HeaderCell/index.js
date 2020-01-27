import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import DefaultHeaderCell from "../default/DefaultHeaderCell"
import SortIcon from "../SortIcon";
import TableContext from "../../TableContext";

/**
 *
 * @param {string} accessor
 * @param {function} renderSortIcon
 * @return {*}
 */
const HeaderCell = ({accessor}) => {
    const {renderHeaderCell} = useContext(TableContext)
    return renderHeaderCell ? renderHeaderCell({accessor}) : <DefaultHeaderCell {...{accessor, renderSortIcon: (accessor) => (<SortIcon accessor={accessor} />)}} />
}

HeaderCell.propTypes = {
    accessor: PropTypes.string,
}
export default HeaderCell

