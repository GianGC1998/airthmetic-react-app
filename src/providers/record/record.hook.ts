import { useContext } from "react";

import { UseRecord } from "./types";
import { RecordContext } from "./record.provider";

export const useRecord = (): UseRecord => {
  const [state, dispatch] = useContext(RecordContext);
  return [state, dispatch];
};
