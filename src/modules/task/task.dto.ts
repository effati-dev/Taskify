export type CreateTask = {
  title: string;
  status: "todo" | "in_progress" | "done";
  description?: string | undefined;
};

export type UpdateTask = {
  title?: string;
  status?: "todo" | "in_progress" | "done";
  description?: string | undefined;
};

export type GetAllTasksQueryDTO = {
  page: number;
  limit: number;
  search?: string | undefined;
  sort?: "createdAt_asc" | "createdAt_desc" | undefined;
  status?: "todo" | "in_progress" | "done" | undefined;
};
