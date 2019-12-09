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
 * @property {Filter} filter
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
 * @property {filterType} predicate
 * @property {Array.<string>} value
 * @property {boolean} loadFromServer
 * @property {boolean} didInvalidate
 * @property{boolean} isLoading
 */
/**
 * @typedef Filter
 * @type {Object.<string, FilterItemShape>}
 */