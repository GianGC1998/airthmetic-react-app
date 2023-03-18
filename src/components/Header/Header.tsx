import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../providers/auth/auth.hook";

export const Header: FC = () => {
  const [{ authenticated }, { logout }] = useAuth();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "white",
        width: "100vw",
        padding: "20px 160px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0px 3px 6px rgba(0, 0, 0, 0.06), 0px 3px 9px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        True North App
      </Typography>
      {authenticated && (
        <Typography
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={logout}
        >
          Logout
        </Typography>
      )}
    </Box>
  );
};
