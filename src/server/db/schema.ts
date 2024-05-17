import { pgTable, pgEnum, varchar, timestamp, text, integer, uniqueIndex, serial, boolean, bigint, uuid, index, doublePrecision } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const _prisma_migrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finished_at: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migration_name: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolled_back_at: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	started_at: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	applied_steps_count: integer("applied_steps_count").default(0).notNull(),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	email: text("email").notNull(),
	name: text("name"),
	isGuest: boolean("isGuest").default(false).notNull(),
	currentHashedRefreshToken: text("currentHashedRefreshToken"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		email_key: uniqueIndex("users_email_key").on(table.email),
	}
});

export const test = pgTable("test", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("name"),
});

export const product_groups_with_products = pgTable("product_groups_with_products", {
	id: uuid("id"),
	name: text("name"),
	parent_id: uuid("parent_id"),
	nganh_nghe: text("nganh_nghe"),
	image_url: text("image_url"),
	// TODO: failed to parse database type 'json[]'
	// json_products: unknown("json_products"),
});

export const product_groups = pgTable("product_groups", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name"),
	parent_id: uuid("parent_id"),
	nganh_nghe: text("nganh_nghe"),
	image_url: text("image_url"),
	last_synced: timestamp("last_synced", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	level: integer("level").default(0),
	is_leaf: boolean("is_leaf").default(false),
	code: integer("code").default(0),
});

export const product_groups_with_children = pgTable("product_groups_with_children", {
	id: uuid("id"),
	name: text("name"),
	parent_id: uuid("parent_id"),
	image_url: text("image_url"),
	nganh_nghe: text("nganh_nghe"),
	// TODO: failed to parse database type 'json[]'
	// json_products: unknown("json_products"),
	// TODO: failed to parse database type 'json[]'
	// children: unknown("children"),
});

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	ten_sp: text("ten_sp"),
	chat_lieu: text("chat_lieu"),
	quy_cach: text("quy_cach"),
	thuong_hieu: text("thuong_hieu"),
	hoan_thien: text("hoan_thien"),
	don_vi: text("don_vi"),
	product_group_id: uuid("product_group_id").defaultRandom(),
	gia: doublePrecision("gia"),
	last_synced: timestamp("last_synced", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		idx_products_product_group_id: index("idx_products_product_group_id").on(table.product_group_id),
	}
});

export const customers = pgTable("customers", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	sdt: text("sdt"),
	nganh_nghe: text("nganh_nghe"),
	last_synced: timestamp("last_synced", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const menu_nodes = pgTable("menu_nodes", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	image: text("image"),
	pos: integer("pos"),
	// TODO: failed to parse database type 'node_info[]'
	// child_nodes: unknown("child_nodes").array(),
});

export const customer_products = pgTable("customer_products", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	customerid: uuid("customerid").defaultRandom(),
	productid: uuid("productid").defaultRandom(),
	gia: doublePrecision("gia"),
	don_vi: text("don_vi"),
	last_synced: timestamp("last_synced", { mode: 'string' }).defaultNow().notNull(),
	hieu_luc_toi_ngay: timestamp("hieu_luc_toi_ngay", { mode: 'string' }),
},
(table) => {
	return {
		idx_customer_products_customerid: index("idx_customer_products_customerid").on(table.customerid),
	}
});
