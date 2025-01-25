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

test('should allow user to toggle favorite property', async ({ page }) => {
	await page.goto(UI_URL);

	// Search for the property
	await page.getByPlaceholder('Where to?').fill('Kit Kat');
	await page.getByRole('button', { name: 'Search Property' }).click();

	// Click icon btn - add to favorites
	await page.locator('button[aria-label="Favorites Toggle"]').first().click({ force: true });

	await expect(page.getByText('Added to favorites')).toBeVisible();

	// Click icon btn - remove from favorites
	await page.locator('button[aria-label="Favorites Toggle"]').first().click({ force: true });

	await expect(page.getByText('Removed from favorites')).toBeVisible();
});


test('should display users favorite properties', async ({ page }) => {
	// Add to favorites first
	await page.goto(UI_URL);

	await page.getByPlaceholder('Where to?').fill('Kit Kat');
	await page.getByRole('button', { name: 'Search Property' }).click();

	await page.locator('button[aria-label="Favorites Toggle"]').first().click({ force: true });
	await expect(page.getByText('Added to favorites')).toBeVisible();

	// Go to favorites page
	await page.goto(`${UI_URL}my-favorites`);

	await expect(page.getByRole('heading', { name: 'Favorites' })).toBeVisible();

	// Check if favorite property is displayed
	await expect(page.getByText('1000 €').first()).toBeVisible();
	await expect(page.getByText('Kit Kat House').first()).toBeVisible();

	// Remove from favorites
	await page.goto(UI_URL);

	await page.getByPlaceholder('Where to?').fill('Kit Kat');
	await page.getByRole('button', { name: 'Search Property' }).click();

	await page.locator('button[aria-label="Favorites Toggle"]').first().click({ force: true });
	await expect(page.getByText('Removed from favorites')).toBeVisible();
});
