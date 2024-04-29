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
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  const execute = useCallback(
    async (values: TValues) => {
      dispatch({ type: ActionType.Pending });

      startTransition(async () => {
        const res = await action(values);

        // Redirect inside action
        if (!res) {
          return;
        }

        if (!res.ok) {
          onError?.(res.error);
          dispatch({ type: ActionType.Error, error: res.error });
          return;
        }

        if (refreshOnSuccess) {
          refresh();
        }

        onSuccess?.(res.data);
        dispatch({ type: ActionType.Success, data: res.data });
      });
    },
    [action, onError, onSuccess, refresh, refreshOnSuccess]
  );

  return {
    execute,
    ...state,
    isPending,
  };
};
