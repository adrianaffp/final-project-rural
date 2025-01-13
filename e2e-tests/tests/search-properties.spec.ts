import { test, expect } from '@playwright/test';


const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
	await page.goto(UI_URL);

	// Click the sign in button
	await page.getByRole('link', { name: 'Sign In' }).click();

	await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

	// Fill in the email and password
	await page.locator('[name=email]').fill('t@test.com');
	await page.locator('[name=password]').fill('password123');

	// Click the sign in button
	await page.getByRole('button', { name: 'Sign In' }).click();

	await expect(page.getByText('Sign in successful')).toBeVisible();
});

test("should show properties search results", async ({ page }) => {
    await page.goto(UI_URL);

    // destination input fill
    await page.getByPlaceholder('Where to?').fill('Kit Kat City');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Properties found in Kit Kat City')).toBeVisible();
    await expect(page.getByText('Kit Kat House')).toBeVisible();
})
 
test("should show the property detail page", async ({ page }) => {
	await page.goto(UI_URL);

	// destination input fill
	await page.getByPlaceholder('Where to?').fill('Kit Kat City');
	await page.getByRole('button', { name: 'Search' }).click();

	// go to property detail page
	await page.getByText("Kit Kat House").click();
	await expect(page).toHaveURL(/detail/);
	await expect (page.getByRole("button", {name: "Book Now!"})).toBeVisible();
})