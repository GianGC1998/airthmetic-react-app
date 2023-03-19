import MaterialReactTable from "material-react-table";
import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { withRecordProvider } from "../../providers/record/record.hoc";
import { useRecord } from "../../providers/record/record.hook";
import { columns } from "./columns";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { CreateRecordModal } from "./components/CreateRecordModal/CreateRecordModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotification } from "../../providers/notification/notification.hook";

const RecordList: FC = () => {
  const [
    {
      records,
      recordsLoading,
      recordsError,
      pagination,
      sorting,
      filter,
      deleteRecordData,
      deleteRecordLoading,
      deleteRecordError,
    },
    { onFilterChange, onPaginationChange, onSortingChange, deleteRecord },
  ] = useRecord();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { sendNotification } = useNotification();
  useEffect(() => {
    if (deleteRecordData) {
      sendNotification("Record deleted successfully");
    }
  }, [deleteRecordData, sendNotification]);

  return (
    <Layout alignItems="flex-start" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" fontWeight="bold">
              Record List
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setOpenCreateModal(true);
              }}
            >
              New
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <MaterialReactTable
            data={records?.data ?? []}
            columns={columns}
            onGlobalFilterChange={onFilterChange}
            onSortingChange={onSortingChange}
            onPaginationChange={onPaginationChange}
            muiToolbarAlertBannerProps={
              Boolean(recordsError) || Boolean(deleteRecordError)
                ? {
                    color: "error",
                    children: recordsError ?? deleteRecordError,
                  }
                : undefined
            }
            state={{
              // showColumnFilters: false,
              showToolbarDropZone: false,
              isLoading: recordsLoading || deleteRecordLoading,
              showAlertBanner:
                Boolean(recordsError) || Boolean(deleteRecordError),
              showProgressBars: recordsLoading,
              showSkeletons: recordsLoading,
              globalFilter: filter,
              pagination,
              sorting,
            }}
            enableColumnFilters={false}
            enableColumnActions={false}
            enableRowActions
            manualFiltering
            manualPagination
            manualSorting
            rowCount={records?.total ?? 0}
            renderRowActions={({ row }) => (
              <Box>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      deleteRecord(row.original.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </Grid>
      </Grid>
      <CreateRecordModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </Layout>
  );
};

export default withRecordProvider(RecordList);
