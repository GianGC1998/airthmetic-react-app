import { FC } from "react";
import "../assets/css/styles.css";
import { BrowserRoutes } from "../components/Routes/BrowserRoutes";
import { LoggedUserProvider } from "../providers/auth/auth.provider";
import { NotificationProvider } from "../providers/notification/notification.provider";

import { BrowserRouter } from "react-router-dom";
import "../assets/css/styles.css";
import { QueryClientProviderWrapper } from "../components/QueryClientProvider/QueryClientProvider";

export const App: FC = () => {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <QueryClientProviderWrapper>
          <LoggedUserProvider>
            <BrowserRoutes />
          </LoggedUserProvider>
        </QueryClientProviderWrapper>
      </BrowserRouter>
    </NotificationProvider>
  );
};
