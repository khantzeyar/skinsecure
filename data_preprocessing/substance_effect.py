# To provide description for each substance mentioned in cosmetic_notifications_cancelled.csv
# Output: substance.csv

import pandas as pd

# Load CSV file
df = pd.read_csv("cosmetic_notifications_cancelled.csv")

# Extract all substances from the "substance_detected" column
substances = df["substance_detected"].str.replace(" AND ", ",").str.split(",")
substances = substances.explode()
substances = substances.str.strip().str.title()

# Handle the Tretnon / Tretinoin inconsistency
substances = substances.replace("Tretnon", "Tretinoin")

# Get the unique list of substances
unique_substances = substances.unique()

# Dictionary to map substances to their effects
substance_effect = {
    "Mercury": "A toxic heavy metal that can cause skin irritations, kidney damage, and neurological issues.",
    "Tretinoin": "Can cause skin redness, peeling, and increased sun sensitivity.",
    "Clindamycin": "An antibiotic that can lead to nausea, vomiting, diarrhea, joint pain, and skin irritations.",
    "Hydroquinone": "A skin-lightening agent that can cause skin irritations, allergic reactions, and ochronosis (permanent dark spots on the skin).",
    "Steroid": "Can cause skin thinning, mood swings, and affect hormone balance.",
    "Diphenhydramine": "Can cause drowsiness, dry mouth, skin rash, eczema, and increased sun sensitivity.",
    "Menthyl Salicylate": "A pain-relieving compound that can cause skin irritations and allergic reactions.",
    "Menthol": "A cooling agent that can cause eye and skin s as well as allergic reactions.",
    "Thymol": "May cause irritation to the eyes and skin, and can trigger allergic reactions. If swallowed, it may cause a burning sensation, nausea, and possible organ damage.",
    "Trimethoprim": "An antibiotic that can cause skin rash, itching, nausea, and other allergic reactions.",
    "Sulfamethoxazole": "An antibiotic that can cause skin irritations, allergic reactions, increased sun , and loss of appetite.",
    "Ketoconazole": "An antifungal agent that can cause redness, itching, stinging, or burning on the skin.",
    "Chloramphenicol": "An antibiotic that can cause skin irritations and serious blood disorders.",
    "Chlorpheniramine": "Can cause drowsiness, blurred vision, and dry mouth, nose, or throat.",
    "Metronidazole": "An antibiotic used that can cause skin irritations, nausea, and metallic taste in mouth.",
    "Griseofulvin": "May cause headaches, nausea, skin rashes, and increased sun sensitivity.",
    "Miconazole": "Can cause rash, burning, itching, or swelling.",
    "Isopropyl Alcohol": "Can dry and irritate the skin and eyes. May also lead to gastrointestinal issues, neurological problems, and even organ damage.",
    "Azelaic Acid": "Can cause itching, stinging, burning, dryness, or redness of the skin.",
}

# Convert dictionary to dataframe
df = pd.DataFrame(list(substance_effect.items()), columns = ["substance_name", "substance_effect"])

# Write dataframe to CSV
df.to_csv("substance.csv", index = False)