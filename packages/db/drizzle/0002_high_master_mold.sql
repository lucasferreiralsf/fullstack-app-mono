ALTER TABLE "auth"."athlete_profile" ALTER COLUMN "plan_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."athlete_profile" ADD COLUMN "doc_number" text;--> statement-breakpoint
ALTER TABLE "auth"."athlete_profile" DROP COLUMN IF EXISTS "doc_id";