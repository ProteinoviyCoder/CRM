export type RegistrationFormData = {
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
