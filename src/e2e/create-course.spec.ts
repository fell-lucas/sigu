import { UserRole } from '$lib/db-enums';
import { db } from './utils/database';
import { userTable } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/utils';
import { type Page, test as base, expect } from '@playwright/test';
import { eq } from 'drizzle-orm';
import { ulid } from 'ulidx';

const test = base.extend<{
	setup: { page: Page };
}>({
	setup: async ({ page }, use) => {
		const userId = ulid();
		const userEmail = 'newAdmin@gmail.com';
		const userPassword = '#1Abcdef';
		await db.insert(userTable).values({
			email: userEmail,
			id: userId,
			name: 'AdminForTest',
			password: await hashPassword(userPassword),
			role: UserRole.ADMIN
		});

		await page.goto('/signin', { waitUntil: 'networkidle' });
		await page.getByTestId('email-field').fill(userEmail);
		await page.getByTestId('password-field').fill(userPassword);
		await page.getByTestId('submit-btn').first().click();
		await page.waitForTimeout(2000);
		// await page.request.post('/signin', {
		// 	headers: {
		// 		host: 'localhost:4173',
		// 		origin: 'http://localhost:4173',
		// 		referrer: 'http://localhost:4173/signin'
		// 	},
		// 	form: {
		// 		email: userEmail,
		// 		password: userPassword
		// 	}
		// });

		await use({ page });

		// await page.request.post('/?/signout', {
		// 	headers: {
		// 		host: 'localhost:4173',
		// 		origin: 'http://localhost:4173',
		// 		referrer: 'http://localhost:4173/signout'
		// 	},
		// 	form: {
		// 		signout: 1,
		// 		'cf-turnstile-response': ''
		// 	}
		// });

		await db.delete(userTable).where(eq(userTable.id, userId));
	}
});

// test('should go to proponent`s profile page when clicking on the avatar image', async ({
// 	setup: { page }
// }) => {
// 	await page.goto('/activities', { waitUntil: 'networkidle' });

// 	await page.getByTestId('card-heading-user-image').first().click();
// 	await page.waitForLoadState();

// 	await expect(page.getByTestId('user-details-data')).toBeVisible();
// 	await expect(page.getByTestId('user-details-statistics')).toBeVisible();
// 	await expect(page.getByTestId('user-details-published-activities')).toBeVisible();
// 	await expect(page.getByTestId('user-details-finished-activities')).toBeVisible();
// });

// New Course Registration
// Positive Functional Tests
// Registration with all valid fields filled: Verify that the course is created successfully.
// Registration with long title and description: Ensure that the course is created and fields are stored correctly.
// Registration with optional fields left blank: Verify that the course is created even with optional fields left blank.
// Negative Functional Tests
// Registration with the title field empty: Verify that an error message is displayed.
// Registration with a duplicate title: Verify that an error message is displayed.
// Registration with incorrect data format in a specific field: Verify that validation shows an error message.
// Positive Structural Tests
// Database performance check: Ensure that the course is inserted into the database quickly.
// Data structure verification: Ensure that data is stored in the correct format.
// Integration tests with other services (e.g., notification): Verify that registering a course correctly triggers associated services.
// Negative Structural Tests
// Simulated network failure during registration: Verify that an appropriate error message is displayed and data is not partially saved.
// Insertion of corrupted data directly into the database: Verify that the system handles invalid data correctly.
// Verification of race conditions during simultaneous registrations: Ensure that multiple simultaneous registrations do not cause inconsistencies.

test('should create a new course', async ({ setup: { page } }) => {
	await page.goto('/courses', { waitUntil: 'networkidle' });

	await page.getByTestId('new-course-btn').first().click();
	await page.waitForLoadState();

	// await page.click('text=Salvar');
	// await page.waitForLoadState();

	await expect(1).toBe(0);
});
