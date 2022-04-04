import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import TableCell from '@mui/material/TableCell';
import TableHead from "@mui/material/TableHead";
// import TableRow from '@mui/material/TableRow';
import TableSortLabel from "@mui/material/TableSortLabel";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Fragment, useMemo } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from "react-table";
import IndeterminateCheckbox from "./CheckboxReactTable";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";
import styles, { TableCell, TableRow } from "./style";
import TablePaginationActions from "./TablePaginationActions";
const useStyles = makeStyles(styles);
function MainTable({
  tableData,
  column,
  isShowPagination = true,
  isShowFilter = true,
  hideCheckbox = false,
  isShowSort = false,
  limit = 15,
  page: pageNum,
  totalPage,
  totalData,
  handleChangePageTable,
  size = "medium",
  loading
}) {
  const classes = useStyles();

  const data = useMemo(() => tableData || [], [tableData]);
  const columns = useMemo(() => column || [], [column]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    setGlobalFilter,
    gotoPage,
    pageOptions,
    rows,
    state: { pageSize, globalFilter, selectedRowIds, pageIndex },
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: limit, pageIndex: 0 }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    (hooks) => {
      if (!hideCheckbox) {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
          ...columns
        ]);
      }
    }
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage - 1);
    handleChangePageTable && handleChangePageTable(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setPageSize(Number(event.target.value));
  // };

  return (
    <Paper className={classes.tablePage} elevation={0}>
      {isShowFilter && (
        <div style={{ flexShrink: 0 }}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      )}
      <Scrollbars
        style={{
          flex: 1,
          borderRadius: "4px"
        }}
      >
        <Table
          size={size}
          stickyHeader
          aria-label="sticky table"
          {...getTableProps()}
        >
          {loading ? (
            <div className="loading-table">
              <p>Đang tải...</p>
            </div>
          ) : (
            <>
              {(totalData === 0 || rows.length === 0) && (
                <div className="loading-table">
                  <p>Không có dữ liệu...</p>
                </div>
              )}
            </>
          )}
          <TableHead>
            {loading ? (
              <TableRow>
                <TableCell>Đang tải...</TableCell>
              </TableRow>
            ) : (
              <>
                {totalData === 0 || rows.length === 0 ? (
                  <TableRow>
                    <TableCell>Không có dữ liệu...</TableCell>
                  </TableRow>
                ) : (
                  headerGroups.map((headerGroup, index) => (
                    <Fragment key={index}>
                      <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => {
                          return (
                            <Fragment key={index}>
                              {isShowSort ? (
                                <TableCell
                                  key={index}
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                  <div style={{ width: column.width }}>
                                    <TableSortLabel
                                      active={column.isSorted}
                                      direction={
                                        column.isSortedDesc ? "desc" : "asc"
                                      }
                                    >
                                      {column.render("Header")}
                                    </TableSortLabel>
                                  </div>
                                </TableCell>
                              ) : (
                                <TableCell
                                  {...column.getHeaderProps()}
                                  align={column.align ? column.align : "left"}
                                  style={{ width: column.width }}
                                >
                                  <div
                                    className="cell-content"
                                    style={{
                                      width: column.width,
                                      marginLeft:
                                        column.align === "right" && "auto"
                                    }}
                                  >
                                    {column.render("Header")}
                                  </div>
                                </TableCell>
                              )}
                            </Fragment>
                          );
                        })}
                      </TableRow>
                    </Fragment>
                  ))
                )}
              </>
            )}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {/* {headerGroups.map((headerGroup) => (
              <TableRow>
                {headerGroup.headers.map((column) => (
                  <TableCell>
                    {column.canFilter ? column.render('Filter') : null}
                  </TableCell>
                ))}
              </TableRow>
            ))} */}

            {!loading && (
              <>
                {!(totalData === 0 || rows.length === 0) && (
                  <>
                    {page.length >= pageSize ? (
                      page.map((row, key) => {
                        prepareRow(row);
                        return (
                          <TableRow
                            key={key}
                            {...row.getRowProps()}
                            hover
                            aria-checked={_.has(selectedRowIds, row.id)}
                            tabIndex={-1}
                            selected={_.has(selectedRowIds, row.id)}
                          >
                            {row.cells.map((cell, key) => {
                              return (
                                <TableCell
                                  key={key}
                                  align={
                                    cell.column.align
                                      ? cell.column.align
                                      : "left"
                                  }
                                  {...cell.getCellProps()}
                                  style={{ width: cell.column.width }}
                                >
                                  <div
                                    className="cell-content"
                                    style={{
                                      width: cell.column.width,
                                      marginLeft:
                                        cell.column.align === "right" && "auto"
                                    }}
                                  >
                                    {cell.render("Cell")}
                                  </div>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                    ) : (
                      <>
                        {page.map((row, index) => {
                          prepareRow(row);
                          return (
                            <TableRow
                              key={index}
                              {...row.getRowProps()}
                              hover
                              aria-checked={_.has(selectedRowIds, row.id)}
                              tabIndex={-1}
                              selected={_.has(selectedRowIds, row.id)}
                            >
                              {row.cells.map((cell, key) => {
                                return (
                                  <TableCell
                                    key={key}
                                    align={
                                      cell.column.align
                                        ? cell.column.align
                                        : "left"
                                    }
                                    {...cell.getCellProps()}
                                    style={{ width: cell.column.width }}
                                  >
                                    <div
                                      className="cell-content"
                                      style={{
                                        width: cell.column.width,
                                        marginLeft:
                                          cell.column.align === "right" &&
                                          "auto"
                                      }}
                                    >
                                      {cell.render("Cell")}
                                    </div>
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                        {Array(pageSize - page.length)
                          .fill(0)
                          .map((item, index) => (
                            <TableRow key={index}>
                              {columns.map((cellEmpty, cellEmptyIndex) => (
                                <TableCell key={cellEmptyIndex}>
                                  <div className="empty-cell">empty</div>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </Scrollbars>

      {isShowPagination && (
        <TablePaginationActions
          page={pageNum || pageIndex + 1}
          handleChangePage={handleChangePage}
          count={totalPage || pageOptions.length}
          total={totalData || rows.length}
          disabled={loading}
        />
      )}
    </Paper>
  );
}

MainTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  column: PropTypes.array.isRequired,
  isShowPagination: PropTypes.bool,
  isShowFilter: PropTypes.bool,
  hideCheckbox: PropTypes.bool
};

export default MainTable;
