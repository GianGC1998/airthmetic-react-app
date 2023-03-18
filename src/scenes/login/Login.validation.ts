import * as yup from "yup";
import { ErrorMessages } from "../../common/constants/messages.constant";
import { LoginVariables } from "../../providers/auth/types";

export const validationSchema = yup
  .object<LoginVariables>({
    username: yup.string().required(ErrorMessages.MANDATORY_FIELD),
    password: yup.string().required(ErrorMessages.MANDATORY_FIELD),
  })
  .required();
