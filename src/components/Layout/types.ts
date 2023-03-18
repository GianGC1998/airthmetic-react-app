import { Breakpoint } from "@mui/material/styles";

export type LayoutProps = {
  alignItems?:
    | "center"
    | "end"
    | "flex-end"
    | "flex-start"
    | "self-end"
    | "self-start"
    | "start";
  maxWidth?: Breakpoint;
};
