import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);
