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

  const handleSelectRow = (
    id: string,
    e: React.MouseEvent | React.ChangeEvent,
  ) => {
    if (!selection) return;
    e.stopPropagation();
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
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
            <input
              type="text"
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder || "Search..."}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-card-dashboard-dark/50 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-dashboard/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white dark:bg-card-dashboard-dark/30 rounded-[1.25rem] border border-slate-200/60 dark:border-white/5 shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50/40 dark:bg-white/[0.02]">
                {selection && (
                  <th className="px-6 py-5 w-12">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(input) => {
                          if (input) input.indeterminate = isSomeSelected;
                        }}
                        onChange={handleSelectAll}
                        className="size-4 rounded border-slate-300 dark:border-white/10 text-primary-dashboard focus:ring-primary-dashboard/30 transition-all bg-transparent checked:bg-primary-dashboard"
                      />
                    </div>
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 whitespace-nowrap",
                      column.className,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + (selection ? 1 : 0)}
                    className="px-6 py-20"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="size-12 rounded-2xl bg-primary-dashboard/10 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-primary-dashboard animate-spin" />
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                          Retrieving Data
                        </p>
                        <p className="text-xs text-slate-400 font-medium tracking-tight">
                          Synchronizing with EyrieCare central servers...
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selection ? 1 : 0)}
                    className="px-6 py-24 text-center"
                  >
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="size-16 rounded-full bg-slate-50 dark:bg-white/2 flex items-center justify-center mx-auto text-slate-300 dark:text-white/10">
                        <Search className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                          No Records Found
                        </h3>
                        <p className="text-xs font-bold text-slate-400 leading-relaxed">
                          {emptyMessage}
                        </p>
                      </div>
                    </div>
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
                        "group transition-all duration-200 cursor-default relative",
                        onRowClick && "cursor-pointer active:scale-[0.995]",
                        isSelected
                          ? "bg-primary-dashboard/[0.04] dark:bg-primary-dashboard/[0.08] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary-dashboard before:shadow-[0_0_10px_rgba(19,236,182,0.4)]"
                          : "hover:bg-slate-50/80 dark:hover:bg-white/[0.03]",
                      )}
                    >
                      {selection && (
                        <td className="px-6 py-4.5 w-12">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (rowId) handleSelectRow(rowId, e);
                            }}
                            className="size-4 rounded border-slate-300 dark:border-white/10 text-primary-dashboard focus:ring-primary-dashboard/30 transition-all bg-transparent checked:bg-primary-dashboard"
                          />
                        </td>
                      )}
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={cn(
                            "px-6 py-4.5 text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-tight",
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

      {/* Pagination Container */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4 py-8 border-t border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center opacity-80">
            Page{" "}
            <span className="text-primary-dashboard">
              {pagination.currentPage}
            </span>{" "}
            of {pagination.totalPages}
          </p>
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
