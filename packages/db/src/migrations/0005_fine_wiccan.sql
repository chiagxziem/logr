ALTER TABLE "service_token" DROP CONSTRAINT "service_token_encrypted_token_unique";--> statement-breakpoint
DROP INDEX "service_token_encryptedToken_idx";--> statement-breakpoint
ALTER TABLE "service_token" ADD COLUMN "hashed_token" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "service_token_hashedToken_idx" ON "service_token" USING btree ("hashed_token");--> statement-breakpoint
ALTER TABLE "service_token" ADD CONSTRAINT "service_token_hashed_token_unique" UNIQUE("hashed_token");