import { FC } from "react";
import { TextFieldProps } from "./types";
import InputAdornment from "@mui/material/InputAdornment";
import TextFieldMui from "@mui/material/TextField";

export const TextField: FC<TextFieldProps> = ({
  error,
  label,
  required,
  extraProps,
}) => {
  return (
    <TextFieldMui
      error={Boolean(error)}
      label={label}
      helperText={error ?? ""}
      InputProps={{
        endAdornment: required ? (
          <InputAdornment position="end">*</InputAdornment>
        ) : null,
      }}
      sx={{
        marginTop: 2.5,
      }}
      fullWidth
      {...(extraProps ?? {})}
    />
  );
};
