"use client";

import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type { Task, Column } from "../types";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

interface SpreadsheetTableProps {
  data: Task[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCellClick: (rowIndex: number, columnKey: string, value: any) => void;
  onRowClick: (task: Task) => void;
}

export const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({
  data,
  onCellClick,
  onRowClick,
}) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Task; direction: "asc" | "desc" } | null>(null);

  const columns: Column[] = [
    { key: "jobRequest", label: "Job Request", width: "w-[256px]", sortable: true },
    { key: "submitted", label: "Submitted", width: "w-32", sortable: true },
    { key: "status", label: "Status", width: "w-36", sortable: true },
    { key: "submitter", label: "Submitter", width: "w-36", sortable: true },
    { key: "url", label: "URL", width: "w-40", sortable: false },
    { key: "assigned", label: "Assigned", width: "w-36", sortable: true },
    { key: "priority", label: "Priority", width: "w-24", sortable: true },
    { key: "dueDate", label: "Due Date", width: "w-32", sortable: true },
    { key: "estValue", label: "Est. Value", width: "w-32", sortable: true },
  ];

  const handleSort = (key: keyof Task) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCellClick = (rowIndex: number, columnKey: string, value: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCell({ row: rowIndex, col: columnKey });
    onCellClick(rowIndex, columnKey, value);
  };

  const renderCellContent = (task: Task, columnKey: keyof Task, rowIndex: number) => {
    const value = task[columnKey];
    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === columnKey;

    const cellClasses = `
      px-3 py-2 text-sm border-r border-gray-200 cursor-cell hover:bg-blue-50 transition-colors
      ${isSelected ? "bg-grey-100 ring-inset" : ""}
    `;

    switch (columnKey) {
      case "status":
        return (
          <td key={columnKey} className={cellClasses} onClick={(e) => handleCellClick(rowIndex, columnKey, value, e)}>
            <StatusBadge status={value as Task["status"]} />
          </td>
        );
      case "priority":
        return (
          <td key={columnKey} className={cellClasses} onClick={(e) => handleCellClick(rowIndex, columnKey, value, e)}>
            <PriorityBadge priority={value as Task["priority"]} />
          </td>
        );
      case "url":
        return (
          <td key={columnKey} className={cellClasses} onClick={(e) => handleCellClick(rowIndex, columnKey, value, e)}>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {value as string}
            </a>
          </td>
        );
      case "jobRequest":
        return (
          <td key={columnKey} className={`${cellClasses} max-w-0`} onClick={(e) => handleCellClick(rowIndex, columnKey, value, e)}>
            <div className="truncate" title={value as string}>
              {value as string}
            </div>
          </td>
        );
      case "estValue":
        return (
          <td key={columnKey} className={`${cellClasses} font-medium text-right`} onClick={(e) => handleCellClick(rowIndex, columnKey, value, e)}>
            {value as string}
          </td>
        );
      default:
        return (
          <td key={columnKey} className={cellClasses} onClick={(e) => handleCellClick(rowIndex, columnKey, value, e)}>
            {value as string}
          </td>
        );
    }
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [data, sortConfig]);

  const emptyRows = Array.from({ length: 19 }, (_, i) => ({
    id: data.length + i + 1,
    isEmpty: true,
  }));

  return (
    <div className="flex-1 overflow-auto bg-white font-body">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
          <tr>
            <th className="w-[32px] px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              #
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${column.width} px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200`}
              >
                {column.sortable ? (
                  <button className="flex items-center space-x-1 hover:text-gray-700 group" onClick={() => handleSort(column.key)}>
                    <span>{column.label}</span>
                    <ArrowUpDown
                      className={`w-3 h-3 transition-opacity ${
                        sortConfig?.key === column.key ? "opacity-100 text-blue-600" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                ) : (
                  <span>{column.label}</span>
                )}
              </th>
            ))}
            <th className="w-[124px] px-3 py-2 border-r border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((task, index) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
              onClick={() => onRowClick(task)}
            >
              <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 bg-gray-50">{index + 1}</td>
              {columns.map((column) => renderCellContent(task, column.key as keyof Task, index))}
              <td className="w-[124px] border-r border-gray-200 bg-gray-50">
                {/* Add icon, action, or blank */}
              </td>
            </tr>
          ))}
          {emptyRows.map((_, index) => (
            <tr key={`empty-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
              <td className="px-3 py-2 text-sm text-gray-400 border-r border-gray-200 bg-gray-50">
                {data.length + index + 1}
              </td>
              {columns.map((column) => (
                <td
                  key={`${index}-${column.key}`}
                  className="px-3 py-2 border-r border-gray-200 cursor-cell hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="h-5"></div>
                </td>
              ))}
              <td className="w-[124px] border-r border-gray-200 bg-gray-50">
                <div className="h-5"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
