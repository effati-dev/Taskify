import { omitUndefined, prisma } from "../../data/prisma";
import type { createTask } from "./task.dto";

export default {
  createTask: (userId: string, input: createTask) => {
    return prisma.task.create({ data: { ...omitUndefined(input), userId } });
  },
};
