export type CreateTaskDTO = {
  title: string;
  status: "todo" | "in_progress" | "done";
  description?: string | undefined | null;
};

export type UpdateTaskDTO = {
  title?: string | undefined;
  status?: "todo" | "in_progress" | "done" | undefined;
  description?: string | undefined | null;
};

export type GetAllTasksQueryDTO = {
  page: number;
  limit: number;
  search?: string | undefined;
  sort?: "createdAt_asc" | "createdAt_desc" | undefined;
  status?: "todo" | "in_progress" | "done" | undefined;
};
