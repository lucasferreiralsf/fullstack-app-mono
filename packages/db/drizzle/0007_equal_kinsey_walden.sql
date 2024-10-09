ALTER TABLE "auth"."plan" ALTER COLUMN "sku" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."plan" ADD CONSTRAINT "plan_sku_unique" UNIQUE("sku");