import { UserRole } from '$lib/db-enums';
import { db } from './utils/database';
import { userTable, courseTable, sessionTable } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/utils';
import { type Page, test as base, expect } from '@playwright/test';
import { eq } from 'drizzle-orm';
import { ulid } from 'ulidx';

const test = base.extend<{
	setup: { page: Page; professorId: string };
}>({
	setup: async ({ page }, use) => {
		const adminId = ulid();
		const adminEmail = Math.random().toString(36).substr(2, 8) + '@gmail.com';
		const adminPassword = '#1Abcdef';
		await db.insert(userTable).values({
			email: adminEmail,
			id: adminId,
			name: 'Admin For Test',
			password: await hashPassword(adminPassword),
			role: UserRole.ADMIN
		});

		const professorId = ulid();
		const professorEmail = Math.random().toString(36).substr(2, 8) + '@gmail.com';
		const professorPassword = '#1Abcdef';
		await db.insert(userTable).values({
			email: professorEmail,
			id: professorId,
			name: 'Professor For Test',
			password: await hashPassword(professorPassword),
			role: UserRole.PROFESSOR
		});

		await page.goto('/signin', { waitUntil: 'networkidle' });
		await page.getByTestId('email-field').fill(adminEmail);
		await page.getByTestId('password-field').fill(adminPassword);
		await page.getByTestId('submit-btn').first().click();
		await page.waitForTimeout(2000);

		await use({ page, professorId });

		await db.delete(sessionTable).where(eq(sessionTable.userId, adminId));
		await db.delete(userTable).where(eq(userTable.id, adminId));
		await db.delete(courseTable).where(eq(courseTable.professorId, professorId));
		await db.delete(userTable).where(eq(userTable.id, professorId));
	}
});

test.describe.configure({ mode: 'parallel' });

test('should create a new course', async ({ setup: { page, professorId } }) => {
	await page.goto('/courses', { waitUntil: 'networkidle' });

	await page.getByTestId('new-course-btn').first().click();
	await page.waitForLoadState();

	await page.getByTestId('name-field').fill('Test course');
	await page.getByTestId('description-field').fill('Test course description');
	await page.getByTestId('slotsCount-field').fill('10');
	await page.getByTestId('startDate-field').fill('2021-12-12');
	await page.getByTestId('endDate-field').fill('2022-12-12');
	await page.getByTestId('professor-field').selectOption(professorId);
	await page.getByTestId('submit-btn').first().click();

	await expect(page.getByText('Curso criado com sucesso!')).toBeVisible();
});

test('should create a new course even if optional fields were not filled', async ({
	setup: { page, professorId }
}) => {
	await page.goto('/courses', { waitUntil: 'networkidle' });

	await page.getByTestId('new-course-btn').first().click();
	await page.waitForLoadState();

	// Description is a optional field
	await page.getByTestId('name-field').fill('Test course');
	await page.getByTestId('slotsCount-field').fill('10');
	await page.getByTestId('startDate-field').fill('2021-12-12');
	await page.getByTestId('endDate-field').fill('2022-12-12');
	await page.getByTestId('professor-field').selectOption(professorId);
	await page.getByTestId('submit-btn').first().click();

	await expect(page.getByText('Curso criado com sucesso!')).toBeVisible();
});

test('should not create a new course if the startDate is after endDate', async ({
	setup: { page, professorId }
}) => {
	await page.goto('/courses', { waitUntil: 'networkidle' });

	await page.getByTestId('new-course-btn').first().click();
	await page.waitForLoadState();

	await page.getByTestId('name-field').fill('Test course');
	await page.getByTestId('description-field').fill('Test course description');
	await page.getByTestId('slotsCount-field').fill('10');
	await page.getByTestId('startDate-field').fill('2022-02-02');
	await page.getByTestId('endDate-field').fill('2022-01-01');
	await page.getByTestId('professor-field').selectOption(professorId);
	await page.getByTestId('submit-btn').first().click();

	await expect(
		page.getByText('A data de início deve ser anterior à data de término.')
	).toBeVisible();
});

test('should not create a new course if required fields were not filled', async ({
	setup: { page }
}) => {
	await page.goto('/courses', { waitUntil: 'networkidle' });

	await page.getByTestId('new-course-btn').first().click();
	await page.waitForLoadState();

	await page.getByTestId('submit-btn').first().click();

	await expect(page.getByText('Campo obrigatório')).toHaveCount(4);
});

test('should not create a new course if there is some invalid data format', async ({
	setup: { page, professorId }
}) => {
	await page.goto('/courses', { waitUntil: 'networkidle' });

	await page.getByTestId('new-course-btn').first().click();
	await page.waitForLoadState();

	await page.getByTestId('name-field').fill('Test course');
	await page.getByTestId('description-field').fill('Test course description');
	await page.getByTestId('slotsCount-field').fill('-10');
	await page.getByTestId('startDate-field').fill('2022-01-01');
	await page.getByTestId('endDate-field').fill('2022-02-02');
	await page.getByTestId('professor-field').selectOption(professorId);
	await page.getByTestId('submit-btn').first().click();

	await expect(page.getByText('Deve ser um número positivo')).toBeVisible();
});
