import { format } from "date-fns";
export const formatDate = (date: Date, formatStr = "dd/mm/yyyy hh:MM a") => {
  return format(date, formatStr);
};
