export type ResLoginDto = {
  status?: number;
  message?: string;
  user?: {
    id?: string;
    email?: string;
    username: string;
    permissions: string | string[];
    role: string;
  };
};

export type DataLogin = {
  email: string;
  password: string;
};
