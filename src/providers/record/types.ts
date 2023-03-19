import { MRT_PaginationState, MRT_SortingState } from "material-react-table";
import { RecordEntity } from "../../common/entities";
import { OperationType } from "../../common/entities/enums";

export type UseRecordState = {
  records: RecordsResponse | undefined;
  recordsLoading: boolean;
  recordsError: string | undefined;
  filter: string;
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
  createRecordData: CreateRecordResponse | undefined;
  createRecordError: string | undefined;
  createRecordLoading: boolean;
  deleteRecordData: DeleteRecordResponse | undefined;
  deleteRecordError: string | undefined;
  deleteRecordLoading: boolean;
};

export type UseRecordDispatch = {
  getRecords: () => void;
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
  onSortingChange: React.Dispatch<React.SetStateAction<MRT_SortingState>>;
  onPaginationChange: React.Dispatch<React.SetStateAction<MRT_PaginationState>>;
  createRecord: (record: CreateRecordVariables) => void;
  deleteRecord: (recordId: number) => void;
};

export type UseRecord = [UseRecordState, UseRecordDispatch];

export type RecordsResponse = {
  data: RecordEntity[];
  pages: number;
  total: number;
};

export type RecordListConfig = {
  filter: string;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
};

export type CreateRecordResponse = { record: RecordEntity; message: string };

export type CreateRecordVariables = {
  operationType: OperationType;
  variableLeft?: number;
  variableRight?: number;
};

export type DeleteRecordResponse = RecordEntity;

export type DeleteRecordVariables = number;
