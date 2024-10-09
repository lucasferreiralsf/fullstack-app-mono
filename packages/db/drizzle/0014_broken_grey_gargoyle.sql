ALTER TABLE "auth"."athlete_profile" DROP CONSTRAINT "athlete_profile_plan_id_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."athlete_profile" DROP COLUMN IF EXISTS "plan_id";