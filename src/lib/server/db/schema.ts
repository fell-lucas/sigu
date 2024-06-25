import { UserRole } from '$lib/db-enums';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	role: text('role', { enum: [UserRole.ADMIN, UserRole.PROFESSOR, UserRole.STUDENT] })
		.notNull()
		.default(UserRole.STUDENT),
	createdAt: integer('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	name: text('name').notNull(),
	email: text('email').notNull(),
	role: text('role', { enum: [UserRole.ADMIN, UserRole.PROFESSOR, UserRole.STUDENT] })
		.notNull()
		.default(UserRole.STUDENT),
	expiresAt: integer('expires_at').notNull()
});

export const courseTable = sqliteTable('course', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	professorId: text('professor_id')
		.notNull()
		.references(() => userTable.id),
	slotsCount: integer('slots_count').notNull(),
	startDate: integer('start_date').notNull(),
	endDate: integer('end_date').notNull(),
	createdAt: integer('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});
