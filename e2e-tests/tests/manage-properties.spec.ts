import { test, expect } from '@playwright/test';
import path from 'path';

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

test('should alow user to list a property', async ({ page }) => {
	await page.goto(`${UI_URL}list-property`);

	// Fill in form
	await page.locator('[name="name"]').fill('Kit Kat House');
	await page.locator('[name="city"]').fill('Kit Kat City');
	await page.locator('[name="description"]').fill('Kit Kat description for testing property listing');
	await page.locator('[name="pricePerNight"]').fill('1000');
	await page.selectOption('select[name="starRating"]', '5');

	await page.getByText('Rural Hotel').click();

	await page.getByLabel('Indoor swimming pool').check();
	await page.getByLabel('Restaurant').check();
	await page.getByLabel('Free parking').check();

	await page.locator('[name="adultCount"]').fill('4');
	await page.locator('[name="childCount"]').fill('1');

	await page.setInputFiles('[name="imageFiles"]', [path.join(__dirname, 'files', 'alentejo.png'), path.join(__dirname, 'files', 'aljezur.png')]);

	// Click the save button
	await page.getByRole('button', { name: 'Save' }).click();

	// Wait for success toast
	await expect(page.getByText('Property listed successfully!')).toBeVisible();
});
