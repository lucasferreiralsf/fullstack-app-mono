DO $$ BEGIN
 CREATE TYPE "public"."subscription_status" AS ENUM('ACTIVE', 'INACTIVE', 'PAYMENT_PENDING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscription_id" uuid NOT NULL,
	"amount" text NOT NULL,
	"provider_payment_id" text,
	"due_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"athlete_profile_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"start_date" timestamp DEFAULT now(),
	"end_date" timestamp,
	"status" "subscription_status" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."subscriptions" ADD CONSTRAINT "subscriptions_athlete_profile_id_athlete_profile_id_fk" FOREIGN KEY ("athlete_profile_id") REFERENCES "auth"."athlete_profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
