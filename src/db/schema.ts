import { pgTable, varchar, date, text } from "drizzle-orm/pg-core";

export const productApprovedCsv = pgTable("product_approved_csv", {
  notif_no: varchar("notif_no", { length: 20 }).primaryKey(),
  product: varchar("product", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  date_notif: date("date_notif").notNull(),
});

export const productCancelledCsv = pgTable("product_cancelled_csv", {
  notif_no: varchar("notif_no", { length: 20 }).primaryKey(),
  product: varchar("product", { length: 255 }).notNull(),
  holder: varchar("holder", { length: 255 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  substance_detected: text("substance_detected"), // can store multiple substances
});