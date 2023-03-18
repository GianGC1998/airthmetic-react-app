import { FC, ReactNode } from "react";

export type FCWithChildren<T = {}> = FC<{ children?: ReactNode } & T>;

export type QueryConfig = {
  filter: string;
  page: number;
  pageSize: number;
  sorting: { key: string; order: "ASC" | "DESC" } | undefined;
};
