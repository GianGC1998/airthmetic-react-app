import { OperationType } from "./enums";

export type OperationEntity = {
  id: number;
  type: OperationType;
  cost: number;
};
