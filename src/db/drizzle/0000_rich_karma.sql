-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "auth"."aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."one_time_token_type" AS ENUM('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "pgsodium"."key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "pgsodium"."key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "realtime"."action" AS ENUM('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "realtime"."equality_op" AS ENUM('eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"isGuest" boolean DEFAULT false NOT NULL,
	"currentHashedRefreshToken" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_groups_with_products" (
	"id" uuid,
	"name" text,
	"parent_id" uuid,
	"nganh_nghe" text,
	"image_url" text,
	"json_products" json[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"parent_id" uuid,
	"nganh_nghe" text,
	"image_url" text,
	"last_synced" timestamp with time zone DEFAULT now() NOT NULL,
	"level" integer DEFAULT 0,
	"is_leaf" boolean DEFAULT false,
	"code" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_groups_with_children" (
	"id" uuid,
	"name" text,
	"parent_id" uuid,
	"image_url" text,
	"nganh_nghe" text,
	"json_products" json[],
	"children" json[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ten_sp" text,
	"chat_lieu" text,
	"quy_cach" text,
	"thuong_hieu" text,
	"hoan_thien" text,
	"don_vi" text,
	"product_group_id" uuid DEFAULT gen_random_uuid(),
	"gia" double precision,
	"last_synced" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"sdt" text,
	"nganh_nghe" text,
	"last_synced" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_nodes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"image" text,
	"pos" integer,
	"child_nodes" node_info[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_products" (
	"id" bigint PRIMARY KEY NOT NULL,
	"customerid" uuid DEFAULT gen_random_uuid(),
	"productid" uuid DEFAULT gen_random_uuid(),
	"gia" double precision,
	"don_vi" text,
	"last_synced" timestamp DEFAULT now() NOT NULL,
	"hieu_luc_toi_ngay" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_products_product_group_id" ON "products" ("product_group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_customer_products_customerid" ON "customer_products" ("customerid");
*/