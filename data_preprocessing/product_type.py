# To derive product type from product name
# Output: cosmetic_notifications_preprocessed.csv

import pandas as pd
import re

# Load CSV file
df = pd.read_csv("cosmetic_notifications.csv")

# Dictionary of keywords and their corresponding product types
keyword_map = {

    # Makeup Products
    "bb cream": "Makeup",
    "cc cream": "Makeup",
    "pencil": "Makeup",
    "eye liner": "Makeup",
    "eyeliner": "Makeup",
    "eyeshadow": "Makeup",
    "mascara": "Makeup",
    "lipstick": "Makeup",
    "lip gloss": "Makeup",
    "foundation": "Makeup",
    "concealer": "Makeup",
    "corrector": "Makeup",
    "primer": "Makeup",
    "countour": "Makeup",
    "highlighter": "Makeup",
    "blusher": "Makeup",
    "blush": "Makeup",
    "makeup": "Makeup",
    "make - up": "Makeup",

    # Specific Care
    # Eye Care
    "eye": "Eye Care",
    # Lip Care
    "lip": "Lip Care",
    # Body Care
    "body": "Body Care",
    "shower": "Body Care",
    "bath": "Body Care",
    # Face Care
    "facial": "Face Care",
    "face": "Face Care",
    # Neck Care
    "neck": "Neck Care",
    # Hair Care
    "shampoo": "Hair Care",
    "conditioner": "Hair Care",
    "scalp": "Hair Care",
    "hair": "Hair Care",
    "styling": "Hair Care",
    "dandruff": "Hair Care",
    # Oral Care
    "toothpaste": "Oral Care",
    "tooth": "Oral Care",
    "mouthwash": "Oral Care",
    "mouth": "Oral Care",
    "oral": "Oral Care",
    # Hand Care
    "hand": "Hand Care",
    "handwash": "Hand Care",
    "handsoap": "Hand Care",
    "nail": "Hand Care",
    "manicure": "Hand Care",
    # Joint Care
    "knee": "Joint Care",
    "elbow": "Joint Care",
    # Foot Care
    "foot": "Foot Care",
    "heel": "Foot Care",
    # Shave Care
    "shaving": "Shave Care",
    "shave": "Shave Care",
    "aftershave": "Shave Care",
    "preshave": "Shave Care",
    # Intimate Care
    "intimate": "Intimate Care",
    "feminine": "Intimate Care",

    # Perfume and Fragrance
    "perfume": "Perfume",
    "parfum": "Perfume",
    "fragrance": "Perfume",
    "cologne": "Perfume",

    # Default Mapping
    "deodorant": "Deodorant",
    "sunscreen": "Sunscreen",
    "sanitiser": "Sanitiser",
    "handsanitiser": "Sanitiser",
    "lotion": "Lotion",
    "soap": "Soap",
    "scrub": "Scrub",
    "exfoliant": "Scrub",
    "serum": "Serum",
    "ampoule": "Serum",
    "toner": "Toner",
    "essence": "Essence",
    "mask": "Mask",
    "moisturiser": "Moisturiser",
    "cleanser": "Cleanser",
    "cleansing": "Cleanser",
    "balm": "Balm",
    "oil": "Oil",
    "minyak": "Oil",
}

# Function to extract product type from product name
def extract_product_type(product_name):
    product_name_processed = str(product_name).lower()
    product_name_processed = re.sub(r"-.,", " ", product_name_processed)
    product_name_processed = re.sub(r"\s+", " ", product_name_processed).strip()
    for keyword, product_type in keyword_map.items():
        if keyword in product_name_processed:
            return product_type
    return "Other"

# Apply the function to create the product_type column
df["product_type"] = df["product"].apply(extract_product_type)

# Write dataframe to CSV
df.to_csv("cosmetic_notifications_preprocessed.csv", index = False)