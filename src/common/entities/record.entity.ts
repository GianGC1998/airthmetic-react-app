import { RecordStatus } from "./enums";
import { OperationEntity } from "./operation.entity";

export type RecordEntity = {
  id: number;
  amount: number;
  userBalanceBefore: number;
  userBalanceAfter: number;
  status: RecordStatus;
  creationDate: Date;
  variableLeft: number;
  variableRight: number;
  response: string;
  operation: OperationEntity;
};
