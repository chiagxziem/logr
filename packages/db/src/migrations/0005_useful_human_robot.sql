DROP INDEX "event_index_projectId_service_idx";--> statement-breakpoint
DROP INDEX "event_index_projectId_environment_idx";--> statement-breakpoint
ALTER TABLE "dead_letter" ALTER COLUMN "payload" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "level" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "message" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event_index" ALTER COLUMN "level" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "method" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "path" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "status" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "duration" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "env" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "session_id" text;--> statement-breakpoint
ALTER TABLE "event_index" ADD COLUMN "method" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event_index" ADD COLUMN "path" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event_index" ADD COLUMN "status" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "event_index" ADD COLUMN "duration" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "event_index" ADD COLUMN "env" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event_index" ADD COLUMN "session_id" text;--> statement-breakpoint
CREATE INDEX "event_index_projectId_method_idx" ON "event_index" USING btree ("project_id","method");--> statement-breakpoint
CREATE INDEX "event_index_projectId_path_idx" ON "event_index" USING btree ("project_id","path");--> statement-breakpoint
CREATE INDEX "event_index_projectId_status_idx" ON "event_index" USING btree ("project_id","status");--> statement-breakpoint
CREATE INDEX "event_index_projectId_env_idx" ON "event_index" USING btree ("project_id","env");--> statement-breakpoint
CREATE INDEX "event_index_projectId_sessionId_idx" ON "event_index" USING btree ("project_id","session_id");--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "service";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "environment";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "context";--> statement-breakpoint
ALTER TABLE "event_index" DROP COLUMN "service";--> statement-breakpoint
ALTER TABLE "event_index" DROP COLUMN "environment";