import { UserRole } from '$lib/db-enums';
import { userTable } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/utils';
import test, { expect } from '@playwright/test';
import { eq } from 'drizzle-orm';
import { ulid } from 'ulidx';
import { db } from './utils/database';

test.describe.configure({ mode: 'parallel' });

test('signs up correctly', async ({ page }) => {
	const userName = 'testuser';
	const userEmail = 'test@signup.com';
	const userRole = 'PROFESSOR';
	const userPassword = '#1Abcdef';

	await page.goto('/signup', { waitUntil: 'networkidle' });
	await page.locator('#name').fill(userName);
	await page.locator('#email').fill(userEmail);
	await page.locator('#role').click();
	await page.selectOption('#role', { value: userRole });
	await page.locator('#password').fill(userPassword);
	await page.locator('#cpassword').fill(userPassword);
	await page.getByRole('button').click();

	await page.waitForURL('http://localhost:5173/signin');
	await expect(page.getByText('Usuário cadastrado com sucesso!')).toBeVisible();

	await db.delete(userTable).where(eq(userTable.email, userEmail));
});

test('submits without data', async ({ page }) => {
	await page.goto('/signup', { waitUntil: 'networkidle' });
	await page.getByRole('button').click();

	await expect(page.getByText('Campo obrigatório').first()).toBeVisible();
	await expect(page.getByText('E-mail inválido')).toBeVisible();
	await expect(page.getByText('Mínimo de 8 caracteres')).toBeVisible();
	await expect(page.getByText('Deve conter ao menos uma letra maiúscula')).toBeVisible();
	await expect(page.getByText('Deve conter ao menos uma letra minúscula')).toBeVisible();
	await expect(page.getByText('Deve conter ao menos um número')).toBeVisible();
	await expect(page.getByText('Deve conter ao menos um caractere especial')).toBeVisible();
});

test('inputs very large name', async ({ page }) => {
	let veryLargeName = '';

	for (let i = 0; i < 10000; i++) {
		veryLargeName += 'aaaaaaaaaa';
	}

	await page.goto('/signup', { waitUntil: 'networkidle' });
	await page.locator('#name').fill(veryLargeName);

	await page.getByRole('button').click();
	await expect(page.getByText('Máximo de 255 caracteres').first()).toBeVisible();
});
