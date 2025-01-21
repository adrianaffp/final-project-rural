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
	await page.locator('[name="region"]').fill('Kit Kat Region');
	await page.locator('[name="county"]').fill('Kit Kat County');
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
	//await expect(page.getByText('Property listed successfully!')).toBeVisible();
});

test('should display users properties', async ({ page }) => {
	await page.goto(`${UI_URL}my-property`);

	await expect(page.getByRole('heading', {name:'Kit Kat House'}).first()).toBeVisible();
	await expect(page.getByText('Kit Kat description for testing property listing').first()).toBeVisible();
	await expect(page.getByText('Kit Kat County').first()).toBeVisible();
	await expect(page.getByText('1000€ per night').first()).toBeVisible();
	await expect(page.getByText('Rural Hotel').first()).toBeVisible();
	await expect(page.getByText('4 adults').first()).toBeVisible();
	await expect(page.getByText('1 child').first()).toBeVisible();
	await expect(page.getByText('5 Stars').first()).toBeVisible();

	await expect(page.getByRole("link", { name: "List Property" })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Edit Property' }).first()).toBeVisible();
})
 
test('should edit property', async ({ page }) => {
	await page.goto(`${UI_URL}my-property`);

	await page.getByRole('link', { name: 'Edit Property' }).first().click();

	// Edit form
	await page.waitForSelector('[name="name"]', { state: 'attached' });
	await expect(page.locator('[name="name"]')).toHaveValue('Kit Kat House');
	await page.locator('[name="name"]').fill('Kit Kat House UPDATED');

	await page.getByRole('button', { name: 'Save' }).click();

	await expect(page.getByText('Property updated successfully!')).toBeVisible();

	await page.reload();

	// Check edited and reset form
	await expect(page.locator('[name="name"]')).toHaveValue('Kit Kat House UPDATED');
	await page.locator('[name="name"]').fill('Kit Kat House');
	await page.getByRole('button', { name: 'Save' }).click();
})

test('should allow user to delete a property', async ({ page }) => {
	await page.goto(`${UI_URL}my-property`);

	await expect(page.getByRole('heading', { name: 'Kit Kat House' }).first()).toBeVisible();

	// Click icon delete btn
	const deleteButton = page.locator('button.bg-red-400').first();
	await deleteButton.click();

	await page.on('dialog', dialog => {
		expect(dialog.message()).toBe('Are you sure you want to delete this property? This action cannot be undone.');
		dialog.accept();
	});

	// Force Ok on dialog
	await page.keyboard.press('Enter');

	await expect(page.getByText('Property deleted successfully.')).toBeVisible();
})