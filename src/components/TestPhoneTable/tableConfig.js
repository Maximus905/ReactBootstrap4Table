import ft from "../Table/constatnts/filterTypes";
import {getData, getFilterList} from "./async";

const config = {
    getTableData: getData,
    getFilterList: getFilterList,
    columns: [
        {
            accessor: 'office',
            title: 'office',
            minWidth: 300,
            maxWidth: 450,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'office',
                type: 'LIST',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            }
        },
        {
            accessor: 'city',
            title: 'city',
            minWidth: 400,
            maxWidth: 500,
            sortable: true,
            filterable: true
        }
    ]
}
export default config