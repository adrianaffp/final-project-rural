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

test('should show properties search results', async ({ page }) => {
	await page.goto(UI_URL);

	// destination input fill
	await page.getByPlaceholder('Where to?').fill('Kit Kat');
	await page.getByRole('button', { name: 'Search Property' }).click();

	await expect(page.getByText('Properties found in Kit Kat')).toBeVisible();
	await expect(page.getByText('Kit Kat House').first()).toBeVisible();
});

test('should show the property detail page', async ({ page }) => {
	await page.goto(UI_URL);

	// destination input fill
	await page.getByPlaceholder('Where to?').fill('Kit Kat');
	await page.getByRole('button', { name: 'Search Property' }).click();

	// go to property detail page
	await page.getByText('Kit Kat House').first().click();
	await expect(page).toHaveURL(/detail/);
	await expect(page.getByRole('button', { name: 'Book Now !' })).toBeVisible();
});

test('should book a property', async ({ page }) => {
	await page.goto(UI_URL);

	// destination input fill
	await page.getByPlaceholder('Where to?').fill('Kit Kat');

	// check in date and check out 2 days later
	const date = new Date();
	date.setDate(date.getDate() + 2);
	const formatDate = date.toISOString().split('T')[0];
	await page.getByPlaceholder('Check-out').fill(formatDate);

	await page.getByRole('button', { name: 'Search Property' }).click();

	// go to property detail page
	await page.getByText('Kit Kat House').first().click();
	await page.getByRole('button', { name: 'Book Now !' }).click();

	// go to booking page
	await expect(page.getByText('Total Cost: 2000.00€')).toBeVisible();

	// fill in stripe form
	const stripeFrame = page.frameLocator('iframe').first();
	await stripeFrame.locator('[placeholder="Card number"]').fill('4242424242424242');
	await stripeFrame.locator('[placeholder="MM / YY"]').fill('04/35');
	await stripeFrame.locator('[placeholder="CVC"]').fill('424');
	await stripeFrame.locator('[placeholder="ZIP"]').fill('42424');

	await page.getByRole('button', { name: 'Confirm Booking' }).click();
	await expect(page.getByText('Property booked successfully!')).toBeVisible();

	await page.getByRole('link', { name: 'My Bookings' }).click();
	await expect(page.getByText('Kit Kat House').first()).toBeVisible();
});
