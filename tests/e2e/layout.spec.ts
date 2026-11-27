import { expect, test, type Page } from "@playwright/test";

const ROUTES = ["/", "/home", "/places", "/places/dev-001", "/daily", "/saved", "/appointments", "/profile", "/apply/1", "/apply/2", "/apply/3", "/apply/confirm"];
const LONG = "가나다라마바사아자차카타파하".repeat(6).slice(0, 80);

async function seedDraft(page: Page) {
  await page.goto("/home");
  await page.evaluate((intro) => {
    localStorage.clear();
    const t = new Date(Date.now() + 86400000);
    const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(t);
    localStorage.setItem("cheotgil.demo.v1.draft", JSON.stringify({
      personalities: ["다정한"], contactStyles: ["자주"], intro, bio: intro.repeat(5),
      moods: ["조용한"], foods: ["한식"], dateStyles: ["식사"], avoidPlaces: [],
      ageMin: 25, ageMax: 35, partnerPersonalities: [], tempo: "",
      stations: ["성수"], dates: [ymd], timeSlots: ["weekend-lunch"], budgetMin: 10000, budgetMax: 30000,
      disclose: { personalities: true, intro: true, bio: true }, confirmed: false,
      idempotencyKey: "layout-test", updatedAt: new Date().toISOString(),
    }));
    localStorage.setItem("cheotgil.demo.v1.profile", JSON.stringify({ nickname: "아주긴닉네임열두글자요" }));
  }, LONG);
}

for (const width of [320, 375, 430]) {
  test(`${width}px: 가로 넘침 없음, 하단 버튼이 메뉴에 가리지 않음`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 });
    await seedDraft(page);
    for (const route of ROUTES) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${route} 가로 넘침`).toBeLessThanOrEqual(0);

      const next = page.getByTestId("step-next");
      if (await next.count()) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const btn = await next.boundingBox();
        const nav = await page.getByTestId("bottom-nav").boundingBox();
        expect(btn && nav && btn.y + btn.height <= nav.y, `${route} 하단 버튼 가림`).toBeTruthy();
      }
      if (width === 375 && process.env.SHOTS) {
        await page.screenshot({ path: `${process.env.SHOTS}/${route.replaceAll("/", "_") || "_root"}.png`, fullPage: true });
      }
    }
  });
}
