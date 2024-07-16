import { UserRole } from '$lib/db-enums';
import { sessionTable, userTable } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/utils';
import test, { expect } from '@playwright/test';
import { eq } from 'drizzle-orm';
import { ulid } from 'ulidx';
import { db } from './utils/database';

test.describe.configure({ mode: 'parallel' });

test('signs in correctly', async ({ page }) => {
	const userId = ulid();
	const userEmail = 'test@test.com';
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

	await page.waitForURL('http://localhost:5173/');

	await db.delete(userTable).where(eq(userTable.id, userId));
	await db.delete(sessionTable).where(eq(sessionTable.email, userEmail));
});

test('invalid email', async ({ page }) => {
	const userEmail = 'test@test';
	const userPassword = '#1Abcdef';

	await page.goto('/signin', { waitUntil: 'networkidle' });
	await page.getByTestId('email-field').fill(userEmail);
	await page.getByTestId('password-field').fill(userPassword);
	await page.getByTestId('submit-btn').first().click();

	await expect(page.getByText('E-mail inválido')).toBeVisible();
});

test('unexistant email', async ({ page }) => {
	const userEmail = 'test@unexistant.com';
	const userPassword = '#1Abcdef';

	await page.goto('/signin', { waitUntil: 'networkidle' });
	await page.getByTestId('email-field').fill(userEmail);
	await page.getByTestId('password-field').fill(userPassword);
	await page.getByTestId('submit-btn').first().click();

	await expect(page.getByText('E-mail não encontrado')).toBeVisible();
});
