import { yupResolver } from "@hookform/resolvers/yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";
import { Layout } from "../../components/Layout/Layout";
import { TextField } from "../../components/form/TextField/TextField";
import { useAuth } from "../../providers/auth/auth.hook";
import { LoginVariables } from "../../providers/auth/types";
import { useNotification } from "../../providers/notification/notification.hook";
import { validationSchema } from "./Login.validation";

const Login: FC = () => {
  const navigate = useNavigate();
  const [
    {
      authenticated,
      loginData,
      loginError,
      loginLoading,
      loggedUserLoading,
      loggedUser,
    },
    { login },
  ] = useAuth();
  const loadingAuth = useMemo(
    () => loginLoading || loggedUserLoading,
    [loginLoading, loggedUserLoading]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginVariables>({ resolver: yupResolver(validationSchema) });
  const { sendNotification } = useNotification();

  useEffect(() => {
    if (authenticated) {
      sendNotification(
        `Welcome back ${(loginData?.user ?? loggedUser)?.username}!`
      );
      navigate(paths.RECORD.LIST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, navigate, sendNotification]);

  const onSubmit = useCallback(
    (values: LoginVariables) => {
      login(values);
    },
    [login]
  );

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: 548,
          padding: "24px 16px",
          background: "white",
          boxShadow:
            "0px 6px 12px rgba(0, 0, 0, 0.06), 0px 12px 18px rgba(0, 0, 0, 0.1)",
          borderRadius: 1,
        }}
      >
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="username"
            label="Username"
            error={errors.username?.message}
            extraProps={register("username")}
            required
          />
          <TextField
            name="password"
            label="Password"
            error={errors.password?.message}
            extraProps={{ ...register("password"), type: "password" }}
            required
          />
          <Button
            sx={{
              marginTop: 2.5,
            }}
            variant="contained"
            fullWidth
            type="submit"
            size="large"
            disabled={loadingAuth}
            endIcon={!loadingAuth ? <ArrowForwardIcon /> : <CircularProgress />}
          >
            Login
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;
