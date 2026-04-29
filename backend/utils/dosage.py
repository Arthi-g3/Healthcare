import sqlite3
from datetime import datetime

MAX_DAILY_LIMIT = 4000  # Example limit (mg)

def check_overdose(patient_id, medicine_name, new_dosage):
    conn = sqlite3.connect("medical.db")
    cursor = conn.cursor()

    today = datetime.now().strftime("%Y-%m-%d")

    cursor.execute("""
        SELECT SUM(dosage) FROM medication_history
        WHERE patient_id=? AND medicine_name=? AND date(time_taken)=?
    """, (patient_id, medicine_name, today))

    result = cursor.fetchone()[0]
    conn.close()

    total_today = result if result else 0
    total_today += new_dosage

    if total_today > MAX_DAILY_LIMIT:
        return "OVERDOSE"
    elif total_today > MAX_DAILY_LIMIT * 0.8:
        return "WARNING"
    else:
        return "SAFE"
