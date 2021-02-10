import React from "react";
import { useTable, usePagination } from "react-table";
import Layout from '../components/Layout';

import makeData from "../makeData";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    usePagination
  );
  const headerGroup =
    typeof headerGroups[1] !== undefined ? headerGroups[1] : headerGroups[0];
  // Render the UI for your table
  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-800">
      <thead className="bg-gray-900">
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps()}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              {column.render("Header")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="bg-gray-600 divide-y divide-gray-800"
      >
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    //   <div className="pagination">
    //     <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
    //       {"<<"}
    //     </button>{" "}
    //     <button onClick={() => previousPage()} disabled={!canPreviousPage}>
    //       {"<"}
    //     </button>{" "}
    //     <button onClick={() => nextPage()} disabled={!canNextPage}>
    //       {">"}
    //     </button>{" "}
    //     <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
    //       {">>"}
    //     </button>{" "}
    //     <span>
    //       Page{" "}
    //       <strong>
    //         {pageIndex + 1} of {pageOptions.length}
    //       </strong>{" "}
    //     </span>
    //     <span>
    //       | Go to page:{" "}
    //       <input
    //         type="number"
    //         defaultValue={pageIndex + 1}
    //         onChange={(e) => {
    //           const page = e.target.value ? Number(e.target.value) - 1 : 0;
    //           gotoPage(page);
    //         }}
    //         style={{ width: "100px" }}
    //       />
    //     </span>{" "}
    //     <select
    //       value={pageSize}
    //       onChange={(e) => {
    //         setPageSize(Number(e.target.value));
    //       }}
    //     >
    //       {[10, 20, 30, 40, 50].map((pageSize) => (
    //         <option key={pageSize} value={pageSize}>
    //           Show {pageSize}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // </>
  );
}

function TablePage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(100000), []);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-800 sm:rounded-lg">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TablePage;
