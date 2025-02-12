export enum ActionType {
  Pending = "PENDING",
  Success = "SUCCESS",
  Error = "ERROR",
}

export type Action<T> =
  | { type: ActionType.Pending }
  | { type: ActionType.Success; data: T }
  | { type: ActionType.Error; error: string };

export interface State<T> {
  data: T | null;
  error: string | null;
}
