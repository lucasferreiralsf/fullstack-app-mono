ALTER TABLE "auth"."company_employee" ADD COLUMN "doc_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."company_employee" DROP COLUMN IF EXISTS "document_id";