import type { BusinessTask } from "@/shared/storeSlices/businessSlice";
import type { User } from "@/shared/storeSlices/userSlice";

export type ResLoginDto = {
  status?: number;
  message?: string;
  userForResponse?: User;
  tasks?: BusinessTask[];
  businessName?: string;
};

export type DataLogin = {
  username: string;
  password: string;
};

export type LoginFormData = {
  username: {
    text: string;
    error: boolean;
    color: "primary" | "error";
    errorMessage: string;
  };
  password: {
    text: string;
    error: boolean;
    color: "primary" | "error";
    errorMessage: string;
    isVisibleText: boolean;
  };
};
