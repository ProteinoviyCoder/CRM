import type { User } from "@/shared/storeSlices/userSlice";

export type TeamDataDto = {
  message?: string;
  team?: User[];
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

export type UserDto = {
  username: string;
  password: string;
  role: string;
  permissions: string[];
};
