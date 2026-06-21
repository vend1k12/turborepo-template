import type { ColumnSort, Row, RowData } from "@tanstack/react-table";
import type { ComponentType, SVGProps } from "react";

export type FilterVariant =
  | "text"
  | "number"
  | "range"
  | "date"
  | "dateRange"
  | "boolean"
  | "select"
  | "multiSelect";

export type FilterOperator =
  | "iLike"
  | "notILike"
  | "eq"
  | "ne"
  | "isEmpty"
  | "isNotEmpty"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "isBetween"
  | "isRelativeToToday"
  | "inArray"
  | "notInArray";

export type JoinOperator = "and" | "or";

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: Extract<keyof TData, string>;
}

export interface ExtendedColumnFilter<TData> {
  id: Extract<keyof TData, string>;
  filterId?: string;
  value: string | string[];
  variant: FilterVariant;
  operator: FilterOperator;
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  variant: "update" | "delete";
}

declare module "@tanstack/react-table" {
  // TData/TValue are required to match TanStack's ColumnMeta signature for declaration merging.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
  }
}
