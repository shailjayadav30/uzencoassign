import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
 const selectAllRef = useRef<HTMLInputElement>(null);
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const toggleRow = (row: T) => {
    const newSet = new Set(selected);
    if (newSet.has(row.id)) {
      newSet.delete(row.id);
    } else {
      newSet.add(row.id);
    }
    setSelected(newSet);
    onRowSelect?.(data.filter((d) => newSet.has(d.id)));
  };
 const toggleAll = () => {
    if (selected.size === data.length) {
      // unselect all
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      // select all
      const all = new Set(data.map((d) => d.id));
      setSelected(all);
      onRowSelect?.(data);
    }
  };
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selected.size > 0 && selected.size < data.length;
    }
  }, [selected, data]);

  if (loading) {
    return <p className="p-4 text-gray-500">Loading data...</p>;
  }

  if (!data.length) {
    return <p className="p-4 text-gray-500">No data available</p>;
  }

  return (
    <div className="overflow-x-auto border border-gray-300  shadow-md rounded mt-14">
      <table className="min-w-full text-sm text-left border-collapse border border-gray-300  ">
        <thead className="bg-gray-50">
          <tr className="bg-gray-200">
            {selectable && <th className="p-2 border border-gray-300 "> <input
            ref={selectAllRef}
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleAll}
                /></th>}
            {columns.map((col) => (
              <th 
                key={col.key}
                className="p-2 font-bold uppercase border border-gray-300   text-gray-900 cursor-pointer select-none "
                onClick={() => col.sortable && handleSort(col.dataIndex as string)}
              >
                {col.title}
                {col.sortable && sortKey === col.dataIndex && (
                  <span>{sortOrder === "asc" ? " 🔼" : " 🔽"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >
          {sortedData.map((row) => (
            <tr 
              key={row.id}
              className={clsx(
                "border-t ` hover:bg-gray-100 transition",
                selected.has(row.id) && "bg-blue-100"
              )}
            >
              {selectable && ( 
                <td className="p-2 border border-gray-300 ">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row)}
                    aria-label="Select row"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2 border border-gray-300 ">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

