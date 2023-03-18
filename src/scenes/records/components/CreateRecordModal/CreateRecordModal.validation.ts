import * as yup from "yup";
import { ErrorMessages } from "../../../../common/constants/messages.constant";
import { OperationType } from "../../../../common/entities/enums";
import { CreateRecordVariables } from "../../../../providers/record/types";

export const validationSchema = yup
  .object<CreateRecordVariables>({
    operationType: yup
      .mixed()
      .oneOf(Object.values(OperationType), ErrorMessages.MANDATORY_FIELD)
      .required(ErrorMessages.MANDATORY_FIELD),
    variableLeft: yup
      .string()
      .optional()
      .when("operationType", {
        is: (operationType: OperationType) =>
          operationType !== OperationType.RANDOMSTRING,
        then: (_) =>
          yup
            .number()
            .typeError(ErrorMessages.NUMBER_FIELD)
            .required(ErrorMessages.MANDATORY_FIELD),
      }),
    variableRight: yup
      .string()
      .optional()
      .when("operationType", {
        is: (operationType: OperationType) =>
          operationType !== OperationType.SQUAREROOT &&
          operationType !== OperationType.RANDOMSTRING,
        then: (_) =>
          yup
            .number()
            .typeError(ErrorMessages.NUMBER_FIELD)
            .required(ErrorMessages.MANDATORY_FIELD),
      }),
  })
  .required();
