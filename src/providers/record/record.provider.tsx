import { useMutation, useQuery } from "@tanstack/react-query";
import { MRT_PaginationState, MRT_SortingState } from "material-react-table";
import { createContext, useCallback, useEffect, useState } from "react";
import { QueryActions } from "../../common/constants/queries.constant";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import {
  createRecord as createRecordFn,
  deleteRecord as deleteRecordFn,
  getRecords,
} from "../../network/record.network";
import {
  CreateRecordResponse,
  CreateRecordVariables,
  DeleteRecordResponse,
  DeleteRecordVariables,
  RecordsResponse,
  UseRecord,
} from "./types";
import { OperationType } from "../../common/entities/enums";

const initialRecordContext: UseRecord = [
  {
    records: undefined,
    recordsError: undefined,
    recordsLoading: false,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [],
    filter: "",
    createRecordData: undefined,
    createRecordError: undefined,
    createRecordLoading: false,
    deleteRecordData: undefined,
    deleteRecordError: undefined,
    deleteRecordLoading: false,
  },
  {
    getRecords: () => void 0,
    onFilterChange: (_) => void 0,
    onPaginationChange: (_) => void 0,
    onSortingChange: (_) => void 0,
    createRecord: (_) => void 0,
    deleteRecord: (_) => void 0,
  },
];

export const RecordContext = createContext<UseRecord>(initialRecordContext);

export const RecordProvider: FCWithChildren = ({ children }) => {
  const [filter, setFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const { error, data, isLoading, refetch } = useQuery<
    RecordsResponse,
    ErrorQuery
  >(
    [QueryActions.RECORD_GET_ALL],
    () =>
      getRecords({
        filter: filter,
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sorting:
          sorting.length > 0
            ? {
                key: sorting[0].id,
                order: sorting[0].desc ? "DESC" : "ASC",
              }
            : undefined,
      }),
    {
      enabled: false,
    }
  );

  const {
    data: createRecordData,
    error: createRecordError,
    isLoading: createRecordLoading,
    mutate,
    isSuccess,
    reset,
  } = useMutation<CreateRecordResponse, ErrorQuery, CreateRecordVariables>(
    [QueryActions.RECORD_POST],
    createRecordFn
  );
  const {
    data: deleteRecordData,
    error: deleteRecordError,
    isLoading: deleteRecordLoading,
    mutate: mutateDelete,
    isSuccess: isSuccessDelete,
  } = useMutation<DeleteRecordResponse, ErrorQuery, DeleteRecordVariables>(
    [QueryActions.RECORD_DELETE],
    deleteRecordFn
  );

  const performFetchRecords = useCallback(() => refetch(), [refetch]);
  const refetchRecords = useCallback(
    () =>
      pagination.pageIndex === 0
        ? performFetchRecords()
        : setPagination((prev) => ({ pageIndex: 0, pageSize: prev.pageSize })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagination, performFetchRecords, setPagination]
  );

  const createRecord = useCallback(
    (values: CreateRecordVariables) => {
      const record = { ...values };

      if (record.operationType === OperationType.RANDOMSTRING) {
        delete record.variableLeft;
        delete record.variableRight;
      }
      if (record.operationType === OperationType.SQUAREROOT) {
        delete record.variableRight;
      }
      mutate(record);
    },
    [mutate]
  );

  useEffect(() => {
    refetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) refetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageSize, filter, sorting]);

  useEffect(() => {
    if (!isLoading) performFetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex]);

  useEffect(() => {
    if (isSuccess || isSuccessDelete) {
      reset();
      refetchRecords();
    }
  }, [isSuccess, isSuccessDelete, refetchRecords, reset]);

  return (
    <RecordContext.Provider
      value={[
        {
          records: data,
          recordsLoading: isLoading,
          recordsError: error?.response?.data?.message ?? error?.message,
          filter,
          pagination,
          sorting,
          createRecordData,
          createRecordError:
            createRecordError?.response?.data?.message ??
            createRecordError?.message,
          createRecordLoading,

          deleteRecordData,
          deleteRecordError:
            deleteRecordError?.response?.data?.message ??
            deleteRecordError?.message,
          deleteRecordLoading,
        },
        {
          getRecords: () => refetch(),
          onFilterChange: setFilter,
          onSortingChange: setSorting,
          onPaginationChange: setPagination,
          createRecord,
          deleteRecord: mutateDelete,
        },
      ]}
    >
      {children}
    </RecordContext.Provider>
  );
};
