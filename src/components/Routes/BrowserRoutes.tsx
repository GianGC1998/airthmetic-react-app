import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";
import Login from "../../scenes/login/Login.scene";

import { FCWithChildren } from "../../common/types/general.types";
import PrivateRoute from "./PrivateRoute";
import RecordListScene from "../../scenes/records/RecordList.scene";

export const BrowserRoutes: FCWithChildren = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.LOGIN} replace />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route
        path={paths.RECORD.LIST}
        element={
          <PrivateRoute>
            <RecordListScene />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
