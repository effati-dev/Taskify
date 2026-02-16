export type RegisterUserDTO = {
  email: string;
  name?: string;
  password: string;
  roleId: string;
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

export type GetAllUsersQueryDTO = {
  page: number;
  limit: number;
  search?: string | undefined;
  sort?: "createdAt_asc" | "createdAt_desc" | undefined;
};
