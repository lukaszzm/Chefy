import dotenv from "dotenv";

dotenv.config();

export interface E2EAccount {
  email: string;
  password: string;
}

const e2eEmail = process.env.E2E_EMAIL!;
const e2ePassword = process.env.E2E_PASSWORD!;

export const E2E_ACCOUNTS = [
  {
    email: `0-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `1-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `2-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `3-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `4-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `5-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `6-${e2eEmail}`,
    password: e2ePassword,
  },
  {
    email: `7-${e2eEmail}`,
    password: e2ePassword,
  },
] as const satisfies E2EAccount[];
