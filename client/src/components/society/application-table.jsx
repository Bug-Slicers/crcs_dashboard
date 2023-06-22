import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";

const SelectColumnFilter = ({ column }) => {
  const { filterValue, setFilter, preFilteredRows, id } = column;
  const options = useMemo(() => {
    const uniqueValues = new Set(preFilteredRows.map((row) => row.values[id]));
    return [...uniqueValues.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
      className="px-2 py-1 border border-gray-300 rounded"
    >
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const SelectStatusColumnFilter = ({ column }) => {
  const { filterValue, setFilter, preFilteredRows, id } = column;
  const options = useMemo(() => {
    const uniqueValues = new Set(preFilteredRows.map((row) => row.values[id]));
    return [...uniqueValues.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
      className="px-2 py-1 border border-gray-300 rounded"
    >
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option ? "Approved" : "Pending"}
        </option>
      ))}
    </select>
  );
};

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder="Search..."
      className="px-2 py-1 border border-gray-300 rounded"
    />
  );
};

const ApplicationTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Application Type",
        accessor: "application_type",
        Cell: ({ value }) => (
          <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
            {value}
          </span>
        ),
        Filter: SelectColumnFilter,
      },
      {
        Header: "Application Title",
        accessor: "application_title",
        Filter: ColumnFilter,
      },
      {
        Header: "Application Description",
        accessor: "application_desc",
        Filter: ColumnFilter,
      },
      {
        Header: "Status",
        accessor: "is_approved",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 ${
              value ? "bg-green-500" : "bg-red-500"
            } text-white rounded`}
          >
            {value ? "Approved" : "Pending"}
          </span>
        ),
        Filter: SelectStatusColumnFilter,
        filter: "includes",
      },
      {
        Header: "Date of Application",
        accessor: "date_of_application",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        Filter: ColumnFilter,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleViewDetails(row.original)}
          >
            View Details
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { globalFilter: "" },
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  const handleViewDetails = (application) => {
    // Implement your logic to show the application details
    console.log(application);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        className="px-4 py-2 border border-gray-300 rounded-md mb-4"
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden">
          <table {...getTableProps()} className="w-full">
            {/* Table headers */}
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-2 px-4 font-semibold text-left text-gray-800 bg-gray-100"
                    >
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      <span className="ml-1">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span>&darr;</span>
                          ) : (
                            <span>&uarr;</span>
                          )
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table body */}
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="py-2 px-4 border-t border-gray-200"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTable;
