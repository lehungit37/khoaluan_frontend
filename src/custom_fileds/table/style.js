import { styled } from "@mui/material/styles";
import TableCellMui, { tableCellClasses } from "@mui/material/TableCell";
import TableRowMui from "@mui/material/TableRow";

export const TableCell = styled(TableCellMui)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2)
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export const TableRow = styled(TableRowMui)(({ theme }) => ({
  height: "50px",
  zIndex: "1",
  "&:hover": {
    backgroundColor: `${theme.palette.action.selected} !important`,
    cursor: "pointer"
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  },
  "& .MuiTableSortLabel-root:hover, & .MuiTableSortLabel-root.Mui-active, & ": {
    color: theme.palette.common.white
  },
  "& .MuiTableSortLabel-icon": {
    color: `${theme.palette.common.white} !important`
  },
  "& .empty-cell": {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    color: "transparent",
    visibility: "hidden",
    height: "100%"
  },
  "& .cell-content": {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word"
  }
}));

const styles = () => {
  return {
    tablePage: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      // height: "81vh",
      "& .MuiTablePagination-toolbar": {
        justifyContent: "center",
        padding: 0,
        "& .MuiTablePagination-displayedRows, & .MuiTablePagination-spacer": {
          display: "none"
        },
        "& .MuiBox-root": {
          margin: 0
        }
      },
      "& .loading-table": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
      }
    }
  };
};

export default styles;
