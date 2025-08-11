CREATE TABLE "ingredients" (
	"ingredient" varchar(255) PRIMARY KEY NOT NULL,
	"ingredient_count" integer NOT NULL,
	"risk_explanation" text
);
--> statement-breakpoint
CREATE TABLE "product_approved_csv" (
	"notif_no" varchar(20) PRIMARY KEY NOT NULL,
	"product" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"date_notif" date NOT NULL,
	"product_type" varchar(64)
);
--> statement-breakpoint
CREATE TABLE "product_cancelled_csv" (
	"notif_no" varchar(20) PRIMARY KEY NOT NULL,
	"product" varchar(255) NOT NULL,
	"holder" varchar(255) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"substance_detected" text
);
