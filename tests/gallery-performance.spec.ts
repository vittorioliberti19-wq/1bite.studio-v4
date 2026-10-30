import { test, expect } from "@playwright/test";

test("gallery waits for playback and filters before loading each batch", async ({ page }) => {
  const videoRequests: string[] = [];
  page.on("request", request => {
    if (/\/galeria\/reels\/.*\.mp4(?:\?|$)/.test(request.url())) videoRequests.push(request.url());
  });
  await page.goto("/galeria");
  await expect(page.getByRole("button", { name: "Reproducir reel del portafolio" }).first()).toBeVisible();
  await page.waitForTimeout(1500);
  expect(videoRequests).toEqual([]);
  await expect(page.locator("video")).toHaveCount(0);

  for (const [name, category] of [["Branding", "branding"], ["Webs", "webs"]]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.getByRole("button", { name, exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-flip]")).toHaveCount(24);
    await expect(page.locator(`[data-flip]:not([data-flip="${category}"])`)).toHaveCount(0);
    await expect(page.locator("video")).toHaveCount(0);
  }
  expect(videoRequests).toEqual([]);
  await page.getByRole("button", { name: "Reels", exact: true }).click();
  await page.getByRole("button", { name: "Reproducir reel del portafolio" }).first().click();
  await expect(page.locator("video")).toHaveCount(1);
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Branding", exact: true }).click();
  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.locator("[data-flip]")).toHaveCount(24);
  const lastTile = page.locator("[data-flip]").last();
  // Wait for Flip to restore normal flow before scrolling to the batch end.
  await expect.poll(() => lastTile.evaluate(el => getComputedStyle(el).position)).not.toBe("absolute");
  await lastTile.scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 300);
  await expect(page.locator("[data-flip]")).toHaveCount(48);
});

test("home keeps a clear mobile offer without changing desktop composition", async ({ page }, testInfo) => {
  await page.goto("/");
  const offer = page.getByText("Branding, contenido y desarrollo digital para tu marca.", { exact: true });
  if (testInfo.project.name === "mobile") {
    await expect(offer).toBeInViewport();
  } else {
    await expect(offer).toBeHidden();
  }
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});
