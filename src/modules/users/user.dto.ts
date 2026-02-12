export type RegisterUserDTO = {
  email: string;
  name?: string;
  password: string;
};

export type GetUserByIdDTO = {
  userId: string;
};

export type GetUserByEmailDTO = {
  email: string;
};

export type UpdateUserDTO = {
  userId: string;
  email?: string;
  name?: string;
};

export type ChangePasswordDTO = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};
