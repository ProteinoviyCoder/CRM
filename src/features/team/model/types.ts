import type { User } from "@/shared/storeSlices/userSlice";

export type TeamDataDto = {
  message?: string;
  team?: User[];
};

export type PermissionsSettins = {
  [ket: string]: {};
};

export type UserSettingsData = {
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
  repeatPassword: {
    text: string;
    error: boolean;
    color: "primary" | "error";
    errorMessage: string;
    isVisibleText: boolean;
  };
  role: string;
};
