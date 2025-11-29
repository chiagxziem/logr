ALTER TABLE "project_token" RENAME COLUMN "token" TO "hashed_token";--> statement-breakpoint
ALTER TABLE "project_token" DROP CONSTRAINT "project_token_token_unique";--> statement-breakpoint
ALTER TABLE "project_token" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "project_token" ADD COLUMN "last_used_at" timestamp;--> statement-breakpoint
CREATE INDEX "project_token_projectId_idx" ON "project_token" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "project_token_hashedToken_idx" ON "project_token" USING btree ("hashed_token");--> statement-breakpoint
ALTER TABLE "project_token" ADD CONSTRAINT "project_token_hashed_token_unique" UNIQUE("hashed_token");