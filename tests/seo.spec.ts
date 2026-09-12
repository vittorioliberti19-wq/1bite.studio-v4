import { test, expect } from "@playwright/test";

test("SEO: sitemap, imágenes y redirecciones recuperables", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("https://1bite.studio/opengraph-image.png");
  expect(xml).not.toContain("/trabajos");
  for (const [old, target] of [["/opengraph-image?726d891f43151970", "/opengraph-image.png"], ["/nuestros-proyectos", "/galeria"], ["/cv", "/oportunidades"]]) {
    const redirect = await request.get(old, { maxRedirects: 0 });
    expect(redirect.status()).toBe(308);
    expect(redirect.headers().location).toContain(target);
    expect((await request.get(target)).status()).toBe(200);
  }
  const missing = await request.get("/seo-audit-pagina-inexistente");
  expect(missing.status()).toBe(404);
});

test("SEO: departamentos, galería y fechas editoriales", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("a[data-dept]");
  await expect(links).toHaveCount(5);
  for (let i=0; i<5; i++) expect(await links.nth(i).getAttribute("href")).toMatch(/^\/servicios\//);
  await page.goto("/galeria");
  await expect(page.getByRole("heading", {level:1})).toBeVisible();
  await expect(page.getByRole("button", {name:"Fotos",exact:true})).toHaveCount(0);
  await expect(page.locator('img[src*="unsplash"]')).toHaveCount(0);
  await page.getByRole("button", {name:"Branding",exact:true}).click();
  await expect(page.getByRole("button", {name:"Branding",exact:true})).toHaveAttribute("aria-pressed","true");
  await expect(page.locator('img[src*="/branding/"]').first()).toBeVisible();
  await page.goto("/blog/cuanto-cuesta-una-app-movil-en-venezuela");
  await expect(page.getByText("Equipo 1bite Studio", {exact:true})).toBeVisible();
  await expect(page.locator('time[datetime="2026-09-12"]')).toBeVisible();
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const graph = scripts.flatMap(s=>JSON.parse(s)["@graph"] ?? [JSON.parse(s)]);
  const article = graph.find(n=>n["@type"] === "BlogPosting");
  expect(article.datePublished).toBe("2026-08-24");
  expect(article.dateModified).toBe("2026-09-12");
  expect(article.image).toBe("https://1bite.studio/opengraph-image.png");
});
