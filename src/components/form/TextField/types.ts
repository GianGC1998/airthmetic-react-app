export type TextFieldProps = {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  extraProps?: { [x: string]: any };
};
