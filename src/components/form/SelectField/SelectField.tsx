import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FC } from "react";
import { SelectFieldProps } from "./types";

export const SelectField: FC<SelectFieldProps> = ({
  label,
  options,
  extraProps,
  error,
  name,
}) => {
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: 2.5,
      }}
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        data-testid="select-field"
        labelId={name}
        id={name}
        name={name}
        label={label}
        {...(extraProps ?? {})}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            value={option}
            data-testid={`select-field-option-${index}`}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
