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
