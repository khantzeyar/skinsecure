CREATE TABLE "product_approved_csv" (
	"notif_no" varchar(20) PRIMARY KEY NOT NULL,
	"product" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"date_notif" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_cancelled_csv" (
	"notif_no" varchar(20) PRIMARY KEY NOT NULL,
	"product" varchar(255) NOT NULL,
	"holder" varchar(255) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"substance_detected" text
);
--> statement-breakpoint
DROP TABLE "harmful_substance" CASCADE;--> statement-breakpoint
DROP TABLE "holder" CASCADE;--> statement-breakpoint
DROP TABLE "manufacturer" CASCADE;--> statement-breakpoint
DROP TABLE "product_approved" CASCADE;--> statement-breakpoint
DROP TABLE "product_cancelled" CASCADE;--> statement-breakpoint
DROP TABLE "product" CASCADE;--> statement-breakpoint
DROP TABLE "substance" CASCADE;