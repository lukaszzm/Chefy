import { ActionType, type Action, type State } from "@/hooks/use-action/types";

export const defaultState = {
  data: null,
  error: null,
} satisfies State<unknown>;

export const createActionReducer =
  <T>() =>
  (_state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case ActionType.Pending:
        return {
          data: null,
          error: null,
        };
      case ActionType.Success: {
        return {
          data: action.data,
          error: null,
        };
      }
      case ActionType.Error:
        return {
          data: null,
          error: action.error,
        };
      default:
        throw new Error("Action not supported");
    }
  };
