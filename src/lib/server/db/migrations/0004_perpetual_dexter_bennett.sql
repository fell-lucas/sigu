ALTER TABLE `session` ADD `role` text DEFAULT 'STUDENT' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `role` text DEFAULT 'STUDENT' NOT NULL;