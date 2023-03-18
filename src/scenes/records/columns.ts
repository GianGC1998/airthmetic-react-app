import { MRT_ColumnDef } from "material-react-table";
import { RecordEntity } from "../../common/entities";
import { formatDate } from "../../common/utils/date.utils";

export const columns: MRT_ColumnDef<RecordEntity>[] = [
  {
    accessorKey: "creationDate",
    header: "Creation date",
    Cell: ({ cell }) => formatDate(new Date(String(cell.getValue()))),
  },
  {
    accessorKey: "operation",
    accessorFn: (record) => record.operation.type,
    header: "Operation",
  },
  { accessorKey: "amount", header: "Amount ($)" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "variableLeft",
    header: "Variable Left",
    Cell: ({ cell }) => (cell.getValue() ? String(cell.getValue()) : "-"),
  },
  {
    accessorKey: "variableRight",
    header: "Variable Right",
    Cell: ({ cell }) => (cell.getValue() ? String(cell.getValue()) : "-"),
  },
  {
    accessorKey: "response",
    header: "Response",
    Cell: ({ cell }) => (cell.getValue() ? String(cell.getValue()) : "-"),
  },
  { accessorKey: "userBalanceAfter", header: "User Balance" },
];
