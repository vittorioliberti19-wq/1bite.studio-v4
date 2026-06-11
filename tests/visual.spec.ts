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

  // planes por tab (selector de categorías) — un heading representativo por grupo
  const planPorTab: [string, string][] = [
    ["Social Media", "Plan Enterprise"],
    ["Branding", "Tier Estratégico"],
    ["Gastro", "Gastro Premium"],
    ["Web", "E-commerce"],
    ["Logo", "Logo + Naming"],
  ];
  await page
    .getByRole("heading", { name: "Planes", exact: true })
    .scrollIntoViewIfNeeded();
  let textoPlanes = "";
  for (const [tab, plan] of planPorTab) {
    await page.getByRole("tab", { name: tab }).click();
    await expect(
      page.getByRole("heading", { name: plan, exact: true }),
    ).toBeVisible();
    textoPlanes += await page.evaluate(() => document.body.innerText);
  }

  // NINGÚN precio visible en el DOM (innerText: solo texto renderizado,
  // excluye <script> JSON-LD que contiene el teléfono +17869063354)
  for (const precio of [
    "$690",
    "$1,000",
    "$1,200",
    "$2,200",
    "$2,500",
    "$2,800",
    "$3,500",
    "$300",
    "$400",
    "690",
    "1000",
    "1200",
    "2500",
    "1300",
    "900",
  ]) {
    expect(textoPlanes, `precio "${precio}" no debe aparecer`).not.toContain(
      precio,
    );
  }

  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("trabajos: muestra grid", async ({ page }, testInfo) => {
  // la sección "Trabajos" del home (con su link "Ver todos") se eliminó;
  // la página vive en el nav.
  await page.goto("/trabajos");
  await expect(
    page.getByRole("heading", { level: 1, name: "Trabajos" }),
  ).toBeVisible();
  await page.screenshot({
    path: `test-results/trabajos-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
