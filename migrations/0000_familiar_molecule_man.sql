CREATE TABLE "harmful_substance" (
	"harmful_substance_id" serial PRIMARY KEY NOT NULL,
	"product_notif_id" varchar(20) NOT NULL,
	"substance_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "holder" (
	"holder_id" serial PRIMARY KEY NOT NULL,
	"holder_name" varchar(100) NOT NULL,
	CONSTRAINT "holder_holder_name_unique" UNIQUE("holder_name")
);
--> statement-breakpoint
CREATE TABLE "manufacturer" (
	"manufacturer_id" serial PRIMARY KEY NOT NULL,
	"manufacturer_name" varchar(100) NOT NULL,
	CONSTRAINT "manufacturer_manufacturer_name_unique" UNIQUE("manufacturer_name")
);
--> statement-breakpoint
CREATE TABLE "product_approved" (
	"product_notif_id" varchar(20) PRIMARY KEY NOT NULL,
	"product_name" varchar(100) NOT NULL,
	"holder_id" serial NOT NULL,
	"product_type" varchar(50) NOT NULL,
	"product_notif_date" date NOT NULL,
	CONSTRAINT "product_approved_product_name_unique" UNIQUE("product_name")
);
--> statement-breakpoint
CREATE TABLE "product_cancelled" (
	"product_notif_id" varchar(20) PRIMARY KEY NOT NULL,
	"product_name" varchar(100) NOT NULL,
	"holder_id" serial NOT NULL,
	"product_type" varchar(50) NOT NULL,
	"manufacturer_id" serial NOT NULL,
	CONSTRAINT "product_cancelled_product_name_unique" UNIQUE("product_name")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"product_notif_id" varchar(20) PRIMARY KEY NOT NULL,
	"product_name" varchar(100) NOT NULL,
	"holder_id" serial NOT NULL,
	"product_type" varchar(50) NOT NULL,
	"product_status" boolean NOT NULL,
	CONSTRAINT "product_product_name_unique" UNIQUE("product_name")
);
--> statement-breakpoint
CREATE TABLE "substance" (
	"substance_id" serial PRIMARY KEY NOT NULL,
	"substance_name" varchar(50) NOT NULL,
	"substance_effect" varchar(500) NOT NULL,
	CONSTRAINT "substance_substance_name_unique" UNIQUE("substance_name")
);
--> statement-breakpoint
ALTER TABLE "harmful_substance" ADD CONSTRAINT "harmful_substance_product_notif_id_product_product_notif_id_fk" FOREIGN KEY ("product_notif_id") REFERENCES "public"."product"("product_notif_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "harmful_substance" ADD CONSTRAINT "harmful_substance_substance_id_substance_substance_id_fk" FOREIGN KEY ("substance_id") REFERENCES "public"."substance"("substance_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_approved" ADD CONSTRAINT "product_approved_product_notif_id_product_product_notif_id_fk" FOREIGN KEY ("product_notif_id") REFERENCES "public"."product"("product_notif_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_approved" ADD CONSTRAINT "product_approved_holder_id_holder_holder_id_fk" FOREIGN KEY ("holder_id") REFERENCES "public"."holder"("holder_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_cancelled" ADD CONSTRAINT "product_cancelled_product_notif_id_product_product_notif_id_fk" FOREIGN KEY ("product_notif_id") REFERENCES "public"."product"("product_notif_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_cancelled" ADD CONSTRAINT "product_cancelled_holder_id_holder_holder_id_fk" FOREIGN KEY ("holder_id") REFERENCES "public"."holder"("holder_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_cancelled" ADD CONSTRAINT "product_cancelled_manufacturer_id_manufacturer_manufacturer_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturer"("manufacturer_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_holder_id_holder_holder_id_fk" FOREIGN KEY ("holder_id") REFERENCES "public"."holder"("holder_id") ON DELETE cascade ON UPDATE no action;