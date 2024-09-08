import { createContext } from "react";
import { toast } from "react-toastify";

export interface RootContext {
  appName: string | undefined;
  userId?: string;
  setUserId: (userId: string) => void;
}

export const rootContext = createContext<RootContext | null>(null);
export const config = 'config';
export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });
export const defaultColDef = {
  flex: 1,
};
export const handleApiError = (e: any) => {
  console.error(e);
  showToast("Unable to connect to backend.");
};
