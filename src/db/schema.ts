import { pgTable, serial, varchar, date, boolean } from "drizzle-orm/pg-core";

// MANUFACTURER TABLE
export const manufacturerTable = pgTable("manufacturer", {
    manufacturer_id: serial("manufacturer_id").primaryKey(),
    manufacturer_name: varchar("manufacturer_name", { length: 100 }).notNull().unique(),
});

// HOLDER TABLE
export const holderTable = pgTable("holder", {
    holder_id: serial("holder_id").primaryKey(),
    holder_name: varchar("holder_name", { length: 100 }).notNull().unique(),
});

// PRODUCT TABLE
export const productTable = pgTable("product", {
    product_notif_id: varchar("product_notif_id", { length: 20 }).primaryKey(),
    product_name: varchar("product_name", { length: 100 }).notNull().unique(),
    holder_id: serial("holder_id").notNull()
        .references(() => holderTable.holder_id, { onDelete: "cascade" }),
    product_type: varchar("product_type", { length: 50 }).notNull(),
    product_status: boolean("product_status").notNull(),
});

// PRODUCT_APPROVED TABLE
export const productApprovedTable = pgTable("product_approved", {
    // Common attributes
    product_notif_id: varchar("product_notif_id", { length: 20 }).primaryKey()
        .references(() => productTable.product_notif_id, { onDelete: "cascade" }),
    product_name: varchar("product_name", { length: 100 }).notNull().unique(),
    holder_id: serial("holder_id").notNull()
        .references(() => holderTable.holder_id, { onDelete: "cascade" }),
    product_type: varchar("product_type", { length: 50 }).notNull(),
    // Exclusive attribute
    product_notif_date: date("product_notif_date").notNull(),
});

// PRODUCT_CANCELLED TABLE
export const productCancelledTable = pgTable("product_cancelled", {
    // Common attributes
    product_notif_id: varchar("product_notif_id", { length: 20 }).primaryKey()
        .references(() => productTable.product_notif_id, { onDelete: "cascade" }),
    product_name: varchar("product_name", { length: 100 }).notNull().unique(),
    holder_id: serial("holder_id").notNull()
        .references(() => holderTable.holder_id, { onDelete: "cascade" }),
    product_type: varchar("product_type", { length: 50 }).notNull(),
    // Exclusive attribute
    manufacturer_id: serial("manufacturer_id").notNull()
        .references(() => manufacturerTable.manufacturer_id, { onDelete: "cascade" }),
});

// SUBSTANCE TABLE
export const substanceTable = pgTable("substance", {
    substance_id: serial("substance_id").primaryKey(), 
    substance_name: varchar("substance_name", { length: 50 }).notNull().unique(), 
    substance_effect: varchar("substance_effect", { length: 500 }).notNull(), 
});

// HARMFUL_SUBSTANCE TABLE
export const harmfulSubstanceTable = pgTable("harmful_substance", {
    harmful_substance_id: serial("harmful_substance_id").primaryKey(),
    product_notif_id: varchar("product_notif_id", { length: 20 }).notNull()
        .references(() => productTable.product_notif_id, { onDelete: "cascade" }),
    substance_id: serial("substance_id").notNull()
        .references(() => substanceTable.substance_id, { onDelete: "cascade" }),
});


export type InsertManufacturer = typeof manufacturerTable.$inferInsert;
export type SelectManufacturer = typeof manufacturerTable.$inferSelect;

export type InsertHolder = typeof holderTable.$inferInsert;
export type SelectHolder = typeof holderTable.$inferSelect;

export type InsertProduct = typeof productTable.$inferInsert;
export type SelectProduct = typeof productTable.$inferSelect;

export type InsertProductApproved = typeof productApprovedTable.$inferInsert;
export type SelectProductApproved = typeof productApprovedTable.$inferSelect;

export type InsertProductCancelled = typeof productCancelledTable.$inferInsert;
export type SelectProductCancelled = typeof productCancelledTable.$inferSelect;

export type InsertSubstance = typeof substanceTable.$inferInsert;
export type SelectSubstance = typeof substanceTable.$inferSelect;

export type InsertHarmfulSubstance = typeof harmfulSubstanceTable.$inferInsert;
export type SelectHarmfulSubstance = typeof harmfulSubstanceTable.$inferSelect;