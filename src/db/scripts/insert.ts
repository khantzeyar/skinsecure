import { createReadStream } from "fs";
import csv from "csv-parser";
import { finished } from "stream/promises";
import { format } from "date-fns";
import path from "path";
import { config } from "dotenv";
import { db } from "@/db/client";
import { manufacturerTable, holderTable, productTable, productApprovedTable, productCancelledTable, 
    substanceTable, harmfulSubstanceTable, InsertManufacturer, InsertHolder, InsertProduct, 
    InsertProductApproved, InsertProductCancelled, InsertSubstance, InsertHarmfulSubstance } from "@/db/schema";

// Load environment variables from .env file
config();

// Function to read data from CSV file
async function readCSV(filePath: string) {
    const rows: any[] = [];
    const stream = createReadStream(filePath).pipe(csv());
    stream.on("data", (data) => rows.push(data));
    await finished(stream);
    return rows;
}

// Function for batch inserts
async function batchInsert<T>(table: any, data: T[], batchSize = 500) {
    for (let i = 0; i < data.length; i += batchSize) {
        const chunk = data.slice(i, i + batchSize);
        if (chunk.length > 0) {
            await db.insert(table).values(chunk).onConflictDoNothing();
        }
    }
}

// Main function to insert data into the database
async function main() {
    // Load CSV files
    const rootDir = path.resolve(__dirname, "../../../");
    const datasetDir = path.join(rootDir, "dataset");
    const cancelledRows = await readCSV(path.join(datasetDir, "cosmetic_notifications_cancelled.csv"));
    const approvedRows = await readCSV(path.join(datasetDir, "cosmetic_notifications_preprocessed.csv"));
    const substanceRows = await readCSV(path.join(datasetDir, "substance.csv"));

    // Get unique values
    // Manufacturers
    const manufacturers = Array.from(
        new Set(cancelledRows.map(r => r.manufacturer).filter(Boolean))
    ).map(name => ({ manufacturer_name: name } as InsertManufacturer));
    // Holders
    const holders = Array.from(
        new Set([...cancelledRows.map(r => r.holder), ...approvedRows.map(r => r.company)].filter(Boolean))
    ).map(name => ({ holder_name: name } as InsertHolder));
    // Substances
    const substances = Array.from(
        new Set(substanceRows.map(r => r.substance_name).filter(Boolean))
    ).map(name => {const row = substanceRows.find(r => r.substance_name === name)!;
        return { substance_name: name, substance_effect: row.substance_effect } as InsertSubstance;
    });

    // Insert data
    // manufacturerTable
    await batchInsert(manufacturerTable, manufacturers);
    // holderTable
    await batchInsert(holderTable, holders);
    // substanceTable
    await batchInsert(substanceTable, substances);

    // Build ID maps
    const manufacturerMap = new Map((await db.select().from(manufacturerTable)).map(m => [m.manufacturer_name, m.manufacturer_id]));
    const holderMap = new Map((await db.select().from(holderTable)).map(h => [h.holder_name, h.holder_id]));
    const substanceMap = new Map((await db.select().from(substanceTable)).map(s => [s.substance_name, s.substance_id]));

    // Get values
    // Products
    const allProducts: InsertProduct[] = [
        ...approvedRows.map(r => ({
            product_notif_id: r.notif_no,
            product_name: r.product,
            holder_id: holderMap.get(r.company)!,
            product_type: r.product_type,
            product_status: true
        })),
        ...cancelledRows.map(r => ({
            product_notif_id: r.notif_no,
            product_name: r.product,
            holder_id: holderMap.get(r.holder)!,
            product_type: "Undefined",
            product_status: false
        }))
    ];
    // Approved Products
    const approvedProducts: InsertProductApproved[] = approvedRows.map(r => ({
        product_notif_id: r.notif_no,
        product_name: r.product,
        holder_id: holderMap.get(r.company)!,
        product_type: r.product_type,
        product_notif_date: format(new Date(r.date_notif), "yyyy-MM-dd")
    }));
    // Cancelled Products
    const cancelledProducts: InsertProductCancelled[] = cancelledRows.map(r => ({
        product_notif_id: r.notif_no,
        product_name: r.product,
        holder_id: holderMap.get(r.holder)!,
        product_type: "Undefined",
        manufacturer_id: manufacturerMap.get(r.manufacturer)!
    }));

    // Insert data
    await batchInsert(productTable, allProducts);
    await batchInsert(productApprovedTable, approvedProducts);
    await batchInsert(productCancelledTable, cancelledProducts);

    // Get values
    // Harmful Substances
    const harmful: InsertHarmfulSubstance[] = cancelledRows.filter(r => r.substance_detected).map(r => ({
        product_notif_id: r.notif_no,
        substance_id: substanceMap.get(r.substance_detected)!
    }));
    // Insert data
    await batchInsert(harmfulSubstanceTable, harmful);
    
    console.log("All CSV data imported successfully.");
}

main().catch(console.error);