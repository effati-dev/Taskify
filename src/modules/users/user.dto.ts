export type RegisterUserDTO = {
  email: string;
  name?: string;
  password: string;
  roleId: string;
};

export type UpdateUserDTO = {
  email?: string | undefined;
  name?: string | undefined;
  roleId?: string | undefined;
};

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};

export type GetAllUsersQueryDTO = {
  page: number;
  limit: number;
  search?: string | undefined;
  sort?: "createdAt_asc" | "createdAt_desc" | undefined;
};
