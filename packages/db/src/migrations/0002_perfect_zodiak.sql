CREATE INDEX "event_index_projectId_eventTs_idx" ON "event_index" USING btree ("project_id","event_ts");--> statement-breakpoint
CREATE INDEX "event_index_projectId_level_idx" ON "event_index" USING btree ("project_id","level");--> statement-breakpoint
CREATE INDEX "event_index_projectId_service_idx" ON "event_index" USING btree ("project_id","service");--> statement-breakpoint
CREATE INDEX "event_index_projectId_environment_idx" ON "event_index" USING btree ("project_id","environment");