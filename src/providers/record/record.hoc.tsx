import { FC } from "react";
import { RecordProvider } from "./record.provider";

export const withRecordProvider = (Component: FC) => () =>
  (
    <RecordProvider>
      <Component />
    </RecordProvider>
  );
