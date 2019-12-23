/**
 * @typedef RowDataShape
 * @type {Object}
 * @property {string} lid
 * @property {string} office
 * @property {boolean} didInvalidate
 * @property {boolean} isLoading
 * @property {boolean} isSelected
 * @property {boolean} isEdited
 */
 /**
 * @typedef StateShape
 * @type {Object}
 * @property {Array.<RowDataShape>} data
 * @property {Array.<string>} sorting
 * @property {Filters} filters
 * @property {boolean} isCtrlPressed
 * @property {boolean} isLoading
 * @property {boolean} didInvalidate
 */
/**
 * @typedef FilterTypeItem
 * @type {Object}
 * @property {string} value
 * @property {string} label
 * @property {boolean} loadFromServer // if true values wil be got from server
 */
/**
 * @typedef FilterItemShape
 * @type {Object}
 * @property {filterType} type
 * @property {Array.<string>} value
 * @property {boolean} didInvalidate
 * @property{boolean} isLoading
 */
/**
 * @typedef Filters
 * @type {Object.<string, FilterItemShape>}
 */

/**
 * TableGrid component props
 * @typedef TableGridProps
 * @type {Object}
 * @property {TableProps} table
 * @property {ColumnsProps} columns
 * @property {function} getTableData
 * @property {Object} custom
 */
/**
 * @typedef TableProps
 * @type {Object}
 */
/**
 * @typedef ColumnsProps
 * @type {Object}
 */
/**
 * @typedef ColumnShape
 * @type {Object}
 * @property {string} title
 * @property {string} accessor
 * @property {number} minWidth
 * @property {number} maxWidth
 * @property {boolean} isVisible
 * @property {boolean} filterable
 * @property {ColumnFilterSettings} filter
 * @property {boolean} sortable
 * @property {function} renderCell
 * @property {function} renderHeaderCell
 */
/**
 * @typedef ColumnFilterSettings
 * @type {Object}
 * @property {string} accessor
 * @property {string} type
 * @property {Array.<string>} allowedTypes
 */

