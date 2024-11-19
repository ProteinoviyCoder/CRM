export type User = {
  id: string;
  username: string;
  email: string;
  permissions: string | string[];
  role: string;
};

export type UserDto = {
  userForResponse: User;
  message: string;
};

export type LoginFormData = {
  email: {
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
