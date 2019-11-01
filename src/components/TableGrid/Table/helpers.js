/**
 * @param {number} tableBoxWidth
 * @param {Array<{minWidth: number, maxWidth: number}>} columnsSizesSettings
 * @param {number} scrollsSizes
 * @return {Array<{minWidth: number, maxWidth: number, width: number}>}
 */
export const calculateColumnsSizes = (tableBoxWidth, scrollsSizes, columnsSizesSettings) => {
    // calculate columns widths
    /**
     *
     * @type {Array<{minWidth: number, width: number, maxWidth: number}>} columnSizes
     */
    const columnsSizes = columnsSizesSettings.map((column) => Object.assign({}, column, {width: column.minWidth}))

    const getFreeSpace = () => {
        const res = tableBoxWidth - scrollsSizes.x - columnsSizes.reduce((sum, column) => sum + column.width, 0)
        return res > 0 ? res : 0
    }
    const getSpacePerColumn = () => {
        const freeSpace = getFreeSpace()
        const columnsCount = columnsSizes.reduce((count, column) => {
            if (column.width < column.maxWidth) return count + 1
            return count
        }, 0)
        if (columnsCount === 0 || freeSpace === 0) return 0
        return freeSpace / columnsCount
    }
    let spacePerColumn = getSpacePerColumn()
    while (spacePerColumn > 0) {
        for (const column of columnsSizes) {
            if (column.width + spacePerColumn <= column.maxWidth) {
                column.width += spacePerColumn
            } else {
                column.width = column.maxWidth
            }
        }
        spacePerColumn = getSpacePerColumn()
    }
    return columnsSizes
}

