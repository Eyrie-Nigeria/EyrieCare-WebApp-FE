"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Pagination } from "./pagination";
import { Loader2, Search } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  selection?: {
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
    getRowId: (item: T) => string;
  };
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  pagination,
  search,
  selection,
  emptyMessage = "No data found",
  onRowClick,
}: DataTableProps<T>) {
  const allIds = data
    .map((item) => selection?.getRowId(item))
    .filter(Boolean) as string[];
  const isAllSelected =
    allIds.length > 0 &&
    allIds.every((id) => selection?.selectedIds.includes(id));
  const isSomeSelected = selection?.selectedIds.length ? !isAllSelected : false;

  const handleSelectAll = () => {
    if (!selection) return;
    if (isAllSelected) {
      selection.onSelectionChange(
        selection.selectedIds.filter((id) => !allIds.includes(id)),
      );
    } else {
      selection.onSelectionChange(
        Array.from(new Set([...selection.selectedIds, ...allIds])),
      );
    }
  };

  const handleSelectRow = (id: string) => {
    if (!selection) return;
    if (selection.selectedIds.includes(id)) {
      selection.onSelectionChange(
        selection.selectedIds.filter((sid) => sid !== id),
      );
    } else {
      selection.onSelectionChange([...selection.selectedIds, id]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar - Optional */}
      {search && (
        <div className="flex items-center gap-2 max-w-sm mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder || "Search..."}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-dashboard/30 transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white dark:bg-card-dashboard-dark rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                {selection && (
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isSomeSelected;
                      }}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-primary-dashboard focus:ring-primary-dashboard transition-all"
                    />
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500",
                      column.className,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + (selection ? 1 : 0)}
                    className="px-6 py-12"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 text-primary-dashboard animate-spin" />
                      <p className="text-sm font-medium text-slate-400">
                        Loading data...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selection ? 1 : 0)}
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-slate-400">
                      {emptyMessage}
                    </p>
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => {
                  const rowId = selection?.getRowId(item);
                  const isSelected =
                    rowId && selection?.selectedIds
                      ? selection.selectedIds.includes(rowId)
                      : false;

                  return (
                    <tr
                      key={rowIndex}
                      onClick={() => onRowClick?.(item)}
                      className={cn(
                        "group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-150 cursor-default",
                        onRowClick && "cursor-pointer",
                        isSelected &&
                          "bg-primary-dashboard/[0.02] dark:bg-primary-dashboard/[0.05]",
                      )}
                    >
                      {selection && (
                        <td className="px-6 py-4 w-10">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              if (rowId) handleSelectRow(rowId);
                            }}
                            className="rounded border-slate-300 text-primary-dashboard focus:ring-primary-dashboard transition-all"
                          />
                        </td>
                      )}
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={cn(
                            "px-6 py-4 text-sm font-medium text-slate-700 dark:text-gray-300",
                            column.className,
                          )}
                        >
                          {column.render
                            ? column.render(item)
                            : column.accessorKey
                              ? (item[column.accessorKey] as React.ReactNode)
                              : null}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}
