import { useCallback, useMemo, useState } from "react";
import { IDialogProps } from "@utils/Dialog";

export const useDialog = (initialOptions?: Partial<IDialogProps>) => {
  const [state, setDialogState] = useState<IDialogProps>(() => ({
    open: false,
    ...initialOptions,
  }));

  const open = useCallback(() => {
    setDialogState((prevState) => ({ ...prevState, open: true }));
  }, []);

  const close = useCallback(() => {
    setDialogState((prevState) => ({ ...prevState, open: false }));
  }, []);

  const set = useCallback((options: Partial<IDialogProps>) => {
    setDialogState((prevState) => ({ open: prevState.open, ...options }));
  }, []);

  const dialogProps = useMemo(
    () => ({
      onClose: close,
      ...state,
    }),
    [state, close],
  );

  return {
    dialogProps,
    open,
    close,
    set,
  };
};
