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
