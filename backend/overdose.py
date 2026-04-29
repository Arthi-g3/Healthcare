# overdose.py

import sqlite3

def check_overdose(patient_id, medicine_name, dosage):
    """
    Checks if the patient is taking an unsafe dosage or repeated medicine.
    Returns status: "GREEN", "YELLOW", or "RED".
    """
    safe_status = "GREEN"
    safe_limit_multiplier = 1.2  # 20% over safe limit is caution
    
    # Connect to database
    conn = sqlite3.connect("medical.db")
    cursor = conn.cursor()
    
    # Get previous dosage of this medicine for this patient
    cursor.execute("""
        SELECT SUM(dosage) FROM medication_history
        WHERE patient_id=? AND medicine_name=?
    """, (patient_id, medicine_name))
    
    result = cursor.fetchone()[0]
    previous_dosage = result if result else 0

    total_dosage = previous_dosage + dosage

    # Example logic: assume safe dosage per medicine = 1000 mg
    safe_dosage_per_medicine = 1000

    if total_dosage <= safe_dosage_per_medicine:
        safe_status = "GREEN"
    elif total_dosage <= safe_dosage_per_medicine * safe_status:
        safe_status = "YELLOW"
    else:
        safe_status = "RED"
    
    conn.close()
    return safe_status
