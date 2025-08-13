import { pgTable, varchar, date, text, integer } from "drizzle-orm/pg-core";

export const productApprovedCsv = pgTable("product_approved_csv", {
  notif_no: varchar("notif_no", { length: 20 }).primaryKey(),
  product: varchar("product", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  date_notif: date("date_notif").notNull(),
  product_type: varchar("product_type", { length: 64 }), 
});

export const productCancelledCsv = pgTable("product_cancelled_csv", {
  notif_no: varchar("notif_no", { length: 20 }).primaryKey(),
  product: varchar("product", { length: 255 }).notNull(),
  holder: varchar("holder", { length: 255 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  substance_detected: text("substance_detected"), // can store multiple substances
});

export const ingredients = pgTable("ingredients", {
  ingredient: varchar("ingredient", { length: 255 }).notNull().primaryKey(),
  ingredient_count: integer("ingredient_count").notNull(),
  risk_explanation: text("risk_explanation"),
});

export const combinedProducts = pgTable("combined_products", {
  notif_no: varchar("notif_no", { length: 20 }).primaryKey(),
  product: varchar("product", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  substance_detected: text("substance_detected"), // nullable for approved, filled for cancelled
});