import { Container } from "@mui/material";
import { FCWithChildren } from "../../common/types/general.types";
import { Header } from "../Header/Header";
import { LayoutProps } from "./types";

export const Layout: FCWithChildren<LayoutProps> = ({
  children,
  alignItems,
  maxWidth,
}) => {
  return (
    <>
      <Header />
      <Container
        maxWidth={maxWidth ?? "sm"}
        sx={{
          paddingTop: 7.5,
          paddingBottom: 7.5,
          display: "flex",
          alignItems: alignItems ?? "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 88px)",
        }}
      >
        {children}
      </Container>
    </>
  );
};
