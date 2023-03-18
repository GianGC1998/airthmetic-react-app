import { AxiosError } from "axios";

export type ErrorQuery = AxiosError<{ message: string }>;
