import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { OperationType, RecordStatus } from "../../../../common/entities/enums";
import { SelectField } from "../../../../components/form/SelectField/SelectField";
import { TextField } from "../../../../components/form/TextField/TextField";
import { useRecord } from "../../../../providers/record/record.hook";
import { CreateRecordVariables } from "../../../../providers/record/types";
import { validationSchema } from "./CreateRecordModal.validation";
import { CreateRecordModalProps } from "./types";
import { useNotification } from "../../../../providers/notification/notification.hook";

export const CreateRecordModal: FC<CreateRecordModalProps> = ({
  open,
  onClose,
}) => {
  const [
    { createRecordData, createRecordError, createRecordLoading },
    { createRecord },
  ] = useRecord();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateRecordVariables>({
    resolver: yupResolver(validationSchema),
    defaultValues: { operationType: OperationType.ADDITION },
  });
  const [showLeftRightConfig, setShowLeftRightConfig] = useState({
    showLeft: true,
    showRight: true,
  });
  const { sendNotification } = useNotification();
  const onCloseModal = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const onChangeOperationType = useCallback((operationType: OperationType) => {
    setShowLeftRightConfig({
      showLeft: operationType !== OperationType.RANDOMSTRING,
      showRight:
        operationType !== OperationType.SQUAREROOT &&
        operationType !== OperationType.RANDOMSTRING,
    });
  }, []);

  const onSubmit = useCallback(
    (values: CreateRecordVariables) => {
      createRecord(values);
    },
    [createRecord]
  );

  useEffect(() => {
    if (createRecordData) {
      sendNotification(
        createRecordData.message,
        createRecordData.record.status === RecordStatus.REJECTED
          ? "error"
          : "success"
      );
      onCloseModal();
    }
  }, [createRecordData, sendNotification, onCloseModal]);

  return (
    <Dialog open={open} onClose={onCloseModal} fullWidth>
      <DialogTitle textAlign="center">New Operation</DialogTitle>
      <DialogContent>
        {createRecordError && (
          <Alert severity="error">{createRecordError}</Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <Controller
              name="operationType"
              control={control}
              render={({ field }) => (
                <SelectField
                  name="operationType"
                  label="Operation type"
                  options={Object.values(OperationType)}
                  error={errors.operationType?.message}
                  extraProps={{
                    ...field,
                    onChange: (e: SelectChangeEvent<OperationType>) => {
                      field.onChange(e);
                      onChangeOperationType(e.target.value as OperationType);
                    },
                  }}
                />
              )}
            />
            {showLeftRightConfig.showLeft && (
              <TextField
                name="variableLeft"
                label="Left value"
                error={errors.variableLeft?.message}
                required={showLeftRightConfig.showLeft}
                extraProps={register("variableLeft")}
              />
            )}
            {showLeftRightConfig.showRight && (
              <TextField
                name="variableRight"
                label="Right value"
                error={errors.variableRight?.message}
                required={showLeftRightConfig.showRight}
                extraProps={register("variableRight")}
              />
            )}
          </Stack>
          <Grid container justifyContent="space-between" marginTop={2.5}>
            <Grid item>
              <Button disabled={createRecordLoading} onClick={onCloseModal}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={createRecordLoading}
                color="primary"
                type="submit"
                variant="contained"
              >
                {createRecordLoading ? (
                  <CircularProgress size={30} />
                ) : (
                  "Make operation"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
