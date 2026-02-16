import env from "../env";
import { hashPassword } from "../utils/hash";
import { prisma } from "./prisma";

const roles = [
  { name: "User", id: "user" },
  { name: "Admin", id: "admin" },
];

const users = [
  {
    email: env.ADMIN_INITIAL_EMAIL || "admin@mail.com",
    role: { connect: { id: "admin" } },
    name: "Admin",
    passwordHash: await hashPassword(env.ADMIN_INITIAL_PASSWORD || "123456"),
  },
];

const seed = async () => {
  try {
    const createdRoles: Record<any, any>[] = [];
    for (const role of roles) {
      createdRoles.push(await prisma.role.create({ data: role }));
    }
    console.log(
      `Roles [${createdRoles.map((role) => role.name).join(", ")}] has been created`,
    );

    const createdUsers: Record<any, any>[] = [];
    for (const user of users) {
      createdUsers.push(await prisma.user.create({ data: user }));
    }
    console.log(
      `Users [${createdUsers.map((user) => user.name).join(", ")}] has been created`,
    );

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
