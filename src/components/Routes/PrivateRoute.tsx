import { Navigate } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";
import { FCWithChildren } from "../../common/types/general.types";
import { useAuth } from "../../providers/auth/auth.hook";
import { Layout } from "../Layout/Layout";
import { CircularProgress } from "@mui/material";

const PrivateRoute: FCWithChildren = ({ children }) => {
  const [{ loggedUserLoading, authenticated }] = useAuth();

  if (loggedUserLoading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }
  if (!authenticated) {
    return <Navigate to={paths.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
