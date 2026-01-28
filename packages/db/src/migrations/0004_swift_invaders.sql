DROP MATERIALIZED VIEW IF EXISTS log_hourly_stats CASCADE;--> statement-breakpoint
CREATE TYPE "public"."level" AS ENUM('info', 'warn', 'error', 'debug');--> statement-breakpoint
CREATE TYPE "public"."method" AS ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'CONNECT', 'TRACE');--> statement-breakpoint
ALTER TABLE "log_event" ALTER COLUMN "level" SET DATA TYPE "public"."level" USING "level"::"public"."level";--> statement-breakpoint
ALTER TABLE "log_event" ALTER COLUMN "method" SET DATA TYPE "public"."method" USING "method"::"public"."method";--> statement-breakpoint
CREATE MATERIALIZED VIEW log_hourly_stats
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', "timestamp") AS bucket,
    service_id,
    level,
    status,
    count(*) as log_count,
    avg(duration) as avg_duration
FROM log_event
GROUP BY bucket, service_id, level, status
WITH NO DATA;--> statement-breakpoint
SELECT add_continuous_aggregate_policy('log_hourly_stats',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '30 minutes');