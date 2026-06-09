import { test, expect } from "@playwright/test";

test("home: funnel completo, sin precios, sin errores de consola", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await page.goto("/");

  // scroll por toda la página para disparar los reveals (simula usuario real)
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  await expect(page.getByRole("heading", { level: 1 })).toContainText("1bite");
  await expect(
    page.getByText("Concebimos experiencias indelebles").first(),
  ).toBeVisible();

  // 4 planes sin precio
  await expect(page.getByRole("heading", { name: "Plan Élite" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Plan Enterprise" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tier Esencial" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tier Estratégico" }),
  ).toBeVisible();

  // NINGÚN precio visible en el DOM (innerText: solo texto renderizado,
  // excluye <script> JSON-LD que contiene el teléfono +17869063354)
  const body = await page.evaluate(() => document.body.innerText);
  for (const precio of [
    "$690",
    "$1,000",
    "$1,200",
    "$2,500",
    "690",
    "1000",
    "1200",
    "2500",
    "1300",
    "900",
  ]) {
    expect(body, `precio "${precio}" no debe aparecer`).not.toContain(precio);
  }

  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("trabajos: navega desde home y muestra grid", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ver todos" }).click();
  await expect(page).toHaveURL(/\/trabajos/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Trabajos" }),
  ).toBeVisible();
  await page.screenshot({
    path: `test-results/trabajos-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
