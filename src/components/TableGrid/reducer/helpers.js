/**
 *
 * @param {Object.<string, string>[]} sortState array of objects like {accessor: asc|desc}
 * @param {string} accessor
 * @param {boolean} appendMode
 * @return {Array}
 */
export const changeSorting = (sortState, accessor, appendMode = false) => {
    const sortDirs = ['asc', 'desc']
    //default value for sorting
    const DEFAULT_DIR = sortDirs[0]
    let res = []
    if (!appendMode) {
        const filtered = sortState.filter(item => Object.keys(item)[0] === accessor)
        if (filtered.length === 1) {
            res = filtered.map(item => {
                const nextIndex = sortDirs.indexOf(item[accessor]) + 1
                return  { [accessor]: sortDirs[nextIndex] }
            })
        } else {
            res.push({ [accessor]: DEFAULT_DIR })
        }
        return res.filter(item => Object.values(item)[0])
    }
    const accessorList = sortState.map(item => Object.keys(item)[0])
    if (sortState.length === 0 || !accessorList.includes(accessor)) {
        res = [...sortState, { [accessor]: DEFAULT_DIR }]
    } else {
        res = sortState
            .map(item => {
                const [key] = Object.entries(item)[0]
                const nextIndex = sortDirs.indexOf(item[accessor]) + 1
                if (key === accessor) return { [key]: sortDirs[nextIndex] }
                return item;
            })
    }
    return res.filter(item => Object.values(item)[0])
}
