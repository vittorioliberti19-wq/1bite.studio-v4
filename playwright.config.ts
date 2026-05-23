import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: "list",
  webServer: {
    command: "PORT=4010 npm run dev",
    url: "http://localhost:4010",
    reuseExistingServer: true,
    timeout: 120000,
  },
  use: { baseURL: "http://localhost:4010" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
