import { apiUrls } from "../common/constants/apiUrls.constants";
import { QueryConfig } from "../common/types/general.types";
import { apiManager } from "../common/utils";
import { CreateRecordVariables } from "../providers/record/types";

export const getRecords = async (queryConfig: QueryConfig) => {
  const { data } = await apiManager.post(`${apiUrls.RECORD_URL}/list`, {
    data: queryConfig,
  });
  return data;
};

export const createRecord = async (record: CreateRecordVariables) => {
  const { data } = await apiManager.post(`${apiUrls.RECORD_URL}`, {
    data: record,
  });
  return data;
};
