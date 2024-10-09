ALTER TABLE "auth"."plan" ADD COLUMN "sku" text NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."plan" ADD CONSTRAINT "plan_sku_unique" UNIQUE("sku");