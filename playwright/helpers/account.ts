import { hash } from "bcrypt";

import { randomUUID } from "crypto";

import { createUserWithPreferences, deleteUser, getTestUsers } from "@/lib/db/queries/user";

async function create() {
  const id = randomUUID();
  const password = "E2Etest12345!";

  const hashedPassword = await hash(password, 8);

  const payload = {
    id: id,
    email: `e2e_${id}@e2e.com`,
    name: `e2e_${id}`,
    password: hashedPassword,
  };

  await createUserWithPreferences(payload);

  return {
    email: payload.email,
    password: password,
  };
}

async function clean() {
  const testAccounts = await getTestUsers();

  for (const account of testAccounts) {
    await deleteUser(account.id);
  }
}

export const testAccount = {
  create,
  clean,
};
