import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should allow user to sign in', async ({ page }) => {
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
	await expect(page.getByRole('link', { name: 'Bookings' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('shoul allow user to register', async ({ page }) => {
	const testEmail = `register${Date.now()}@test.com`;

	await page.goto(UI_URL);

	// Click the register button
	await page.getByRole('link', { name: 'Create Account' }).click();

	await expect(page.getByRole('heading', { name: 'Welcome to rural' })).toBeVisible();

	// Fill in form
	await page.locator('[name=firstName]').fill('Kit');
	await page.locator('[name=lastName]').fill('Kat');
	await page.locator('[name=email]').fill(testEmail);
	await page.locator('[name=password]').fill('password123');
	await page.locator('[name=confirmPassword]').fill('password123');

	// Click the register button
	await page.getByRole('button', { name: 'Create Account' }).click();

	await expect(page.getByText('Registration successful!')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Bookings' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
