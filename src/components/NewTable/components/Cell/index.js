/**@jsx jsx*/
import {jsx} from "@emotion/core"
import {useContext} from "react";
import TableContext from "../../TableContext";
import DefaultCell from "../default/DefaultCell";

const Cell = ({accessor, rowData}) => {
    const {renderCell} = useContext(TableContext)
    return renderCell ? renderCell({accessor, rowData}) : <DefaultCell {...{accessor, rowData}} />
}
export default Cell