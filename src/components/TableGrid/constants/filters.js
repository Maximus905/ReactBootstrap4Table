/**
 * Allowed filter types
 * if loadFromServer
 * @enum {FilterTypeItem} filterType
 */
export const filterType = {
    EQ: {value: 'EQ', label: '='},
    NE: {value: 'NE', label: '!='},
    LT: {value: 'LT', label: '<'},
    LE: {value: 'LE', label: '<='},
    GT: {value: 'GT', label: '>'},
    GE: {value: 'GE', label: '>='},
    STARTING: {value: 'STARTING', label: 'начинается с'},
    ENDING: {value: 'ENDING', label: 'заканчивается на'},
    ONE_OF: {value: 'ONE_OF', label: 'список', loadFromServer: true}
}
