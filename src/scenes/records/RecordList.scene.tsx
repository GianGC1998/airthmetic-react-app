import MaterialReactTable from "material-react-table";
import { FC, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { withRecordProvider } from "../../providers/record/record.hoc";
import { useRecord } from "../../providers/record/record.hook";
import { columns } from "./columns";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CreateRecordModal } from "./components/CreateRecordModal/CreateRecordModal";
const RecordList: FC = () => {
  const [
    { records, recordsLoading, recordsError, pagination, sorting, filter },
    { onFilterChange, onPaginationChange, onSortingChange },
  ] = useRecord();
  const [openCreateModal, setOpenCreateModal] = useState(false);

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
              Boolean(recordsError)
                ? {
                    color: "error",
                    children: recordsError,
                  }
                : undefined
            }
            state={{
              showColumnFilters: false,
              showToolbarDropZone: false,
              isLoading: recordsLoading,
              showAlertBanner: Boolean(recordsError),
              showProgressBars: recordsLoading,
              showSkeletons: recordsLoading,
              globalFilter: filter,
              pagination,
              sorting,
            }}
            enableColumnFilters={false}
            enableColumnActions={false}
            enableRowActions={false}
            manualFiltering
            manualPagination
            manualSorting
            rowCount={records?.total ?? 0}
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
