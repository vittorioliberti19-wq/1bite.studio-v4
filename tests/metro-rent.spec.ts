import { test, expect } from "@playwright/test";
import { PREGUNTAS_METRO_RENT } from "../lib/cuestionario-metro-rent";

const DRAFT = "1bite:metro-rent:brief:v1";
const endpoint = "**/functions/v1/cuestionario-submit";
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/_vercel/insights/script.js", "/_vercel/speed-insights/script.js"]) {
    await page.route(`**${path}*`, (route) => route.fulfill({ contentType: "application/javascript", body: "" }));
  }
  // CAPTCHA and submission are stubbed only in this local browser test.
  await page.route("https://challenges.cloudflare.com/turnstile/**", (route) => route.fulfill({ contentType: "application/javascript", body: `window.turnstile={render(el){const f=el.closest('form');const i=document.createElement('input');i.type='hidden';i.name='cf-turnstile-response';i.value='local-qa-token';f.appendChild(i);return 'qa'},remove(){},reset(){}};` }));
});

test("content has unique fields, domain discovery and separate phases", () => {
  const fields = PREGUNTAS_METRO_RENT.flatMap((question) => question.campos);
  expect(PREGUNTAS_METRO_RENT).toHaveLength(35);
  expect(new Set(fields.map((field) => field.name)).size).toBe(fields.length);
  expect(fields.map((field) => field.name)).toEqual(expect.arrayContaining(["Dominio comprado", "Registrador y titular", "Proveedor hosting y renovacion", "Proveedor de correo"]));
  expect(PREGUNTAS_METRO_RENT.find((question) => question.n === "29")?.sub).toContain("por separado");
  expect(PREGUNTAS_METRO_RENT.find((question) => question.n === "33")?.sub).toContain("por separado");
});

test("brand, single-choice and multiple-choice controls work without mobile overflow", async ({ page }, testInfo) => {
  await page.goto("/metro-rent");
  await page.screenshot({ path: testInfo.outputPath("metro-rent-header.png") });
  await expect(page.getByRole("heading", { level: 1, name: "Metro Rent" })).toBeVisible();
  await expect(page.getByRole("img", { name: "1bite", exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByLabel("Empresa o marca")).toHaveValue("Metro Rent");
  const domain = page.getByRole("group", { name: /^Dominio comprado/ });
  await domain.getByRole("radio", { name: "Sí, ya está comprado" }).check();
  await domain.getByRole("radio", { name: "No", exact: true }).check();
  await expect(domain.getByRole("radio", { name: "Sí, ya está comprado" })).not.toBeChecked();
  await expect(domain.getByRole("radio", { name: "No", exact: true })).toBeChecked();
  await expect(page.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow", "0");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("draft restores text, choices and Top 5 cap without storing CAPTCHA", async ({ page }) => {
  let submissions = 0;
  await page.route(endpoint, (route) => { submissions++; return route.abort(); });
  await page.goto("/metro-rent");
  await page.getByLabel("Objetivo principal", { exact: true }).fill("Catálogo y contactos QA");
  await page.getByLabel("Dominio", { exact: true }).fill("metrorent.example");
  const domain = page.getByRole("group", { name: /^Dominio comprado/ });
  await domain.getByRole("radio", { name: "Sí, ya está comprado" }).check();
  const priorities = page.getByRole("group", { name: /^Top 5 para lanzamiento/ });
  for (const option of ["Catálogo de inmuebles", "Búsqueda y filtros", "Captación de leads", "Panel administrativo", "Portal de propietarios"]) await priorities.getByRole("checkbox", { name: option, exact: true }).check();
  await expect(priorities.getByRole("checkbox", { name: "SEO y contenido", exact: true })).toBeDisabled();
  await page.reload();
  await expect(page.getByLabel("Objetivo principal", { exact: true })).toHaveValue("Catálogo y contactos QA");
  await expect(page.getByLabel("Dominio", { exact: true })).toHaveValue("metrorent.example");
  await expect(domain.getByRole("radio", { name: "Sí, ya está comprado" })).toBeChecked();
  await expect(priorities.getByRole("checkbox", { name: "SEO y contenido", exact: true })).toBeDisabled();
  await priorities.getByRole("checkbox", { name: "Portal de propietarios", exact: true }).uncheck();
  await expect(priorities.getByRole("checkbox", { name: "SEO y contenido", exact: true })).toBeEnabled();
  const saved = await page.evaluate((key) => localStorage.getItem(key), DRAFT);
  expect(saved).not.toContain("cf-turnstile-response");
  expect(submissions).toBe(0);
});

test("failed send keeps answers; confirmed retry sends project and clears draft", async ({ page }) => {
  let attempts = 0;
  let payload = "";
  await page.route(endpoint, (route) => {
    attempts++;
    payload = route.request().postData() ?? "";
    return route.fulfill({ status: attempts === 1 ? 500 : 200, json: attempts === 1 ? { error: "Error de prueba, reintenta" } : { ok: true, id: "local-test-id" } });
  });
  await page.goto("/metro-rent");
  await page.getByLabel("Objetivo principal", { exact: true }).fill("Prueba local sin datos reales");
  const goals = page.getByRole("group", { name: /^Objetivos de negocio/ });
  await goals.getByRole("checkbox", { name: "Vender inmuebles", exact: true }).check();
  await goals.getByRole("checkbox", { name: "Captar propietarios", exact: true }).check();
  await page.getByLabel("Tu nombre", { exact: true }).fill("Prueba local");
  await page.getByRole("textbox", { name: "Correo", exact: true }).fill("qa@metro-rent.example");
  await page.getByRole("button", { name: "Enviar respuestas de Metro Rent" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Error de prueba");
  await expect(page.getByLabel("Objetivo principal", { exact: true })).toHaveValue("Prueba local sin datos reales");
  expect(await page.evaluate((key) => localStorage.getItem(key), DRAFT)).not.toBeNull();
  await page.getByRole("button", { name: "Enviar respuestas de Metro Rent" }).click();
  await expect(page.getByText("Recibimos las respuestas de Metro Rent.", { exact: true })).toBeVisible();
  expect(payload).toContain("Metro Rent · Plataforma inmobiliaria · Brief v1");
  expect(payload).toContain("Vender");
  expect(payload).toContain("Captar propietarios");
  expect(payload).toContain('name="tipo"');
  expect(await page.evaluate((key) => localStorage.getItem(key), DRAFT)).toBeNull();
  expect(attempts).toBe(2);
});

test("an unconfirmed 200 response is not reported as saved", async ({ page }) => {
  await page.route(endpoint, (route) => route.fulfill({ json: { ok: true } }));
  await page.goto("/metro-rent");
  await page.getByLabel("Tu nombre", { exact: true }).fill("Prueba local");
  await page.getByRole("textbox", { name: "Correo", exact: true }).fill("qa@metro-rent.example");
  await page.getByRole("button", { name: "Enviar respuestas de Metro Rent" }).click();
  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Metro Rent", exact: true })).toBeVisible();
});

test("existing web questionnaire stays generic and has no local draft", async ({ page }) => {
  await page.goto("/cuestionarioweb");
  await expect(page.getByRole("heading", { name: "Cotiza tu web", exact: true })).toBeVisible();
  await expect(page.getByLabel("Empresa o marca")).toHaveValue("");
  await page.getByLabel("Que vende", { exact: true }).fill("Prueba formulario anterior");
  expect(await page.evaluate((key) => localStorage.getItem(key), DRAFT)).toBeNull();
});
