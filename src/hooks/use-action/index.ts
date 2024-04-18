import { useCallback, useReducer, useTransition } from "react";

import { useRouter } from "next/navigation";

import { createActionReducer, defaultState } from "@/hooks/use-action/reducer";
import { ActionType } from "@/hooks/use-action/types";
import type { ActionResponse } from "@/types";

interface UseActionProps<TValues, TData> {
  action: (values: TValues) => Promise<ActionResponse<TData>>;
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  refreshOnSuccess?: boolean;
}

export const useAction = <TValues = unknown, TData = unknown>({
  action,
  onError,
  onSuccess,
  refreshOnSuccess = true,
}: UseActionProps<TValues, TData>) => {
  const [state, dispatch] = useReducer(createActionReducer<TData>(), defaultState);
  const [, startTransition] = useTransition();
  const { refresh } = useRouter();

  const handleResponse = useCallback(
    (res: ActionResponse<TData>) => {
      if (res.ok) {
        onSuccess?.(res.data);
        dispatch({ type: ActionType.Success, data: res.data });
        if (refreshOnSuccess) {
          refresh();
        }
      } else {
        onError?.(res.error);
        dispatch({ type: ActionType.Error, error: res.error });
      }
    },
    [onError, onSuccess, refresh, refreshOnSuccess]
  );

  const execute = useCallback(
    async (values: TValues) => {
      dispatch({ type: ActionType.Pending });
      const res = await action(values);

      startTransition(() => {
        handleResponse(res);
      });
    },
    [action, handleResponse]
  );

  return {
    execute,
    ...state,
  };
};
