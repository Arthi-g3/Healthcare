import mysql.connector
import qrcode
import os

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Arthi206",
    "database": "smart_medical_system"
}

output_folder = "patient_qr_codes"
os.makedirs(output_folder, exist_ok=True)

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor(dictionary=True)

cursor.execute("SELECT * FROM patients")
patients = cursor.fetchall()

for patient in patients:
    qr_data = str(patient['id'])   # ✅ FIXED

    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=5
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')

    file_path = os.path.join(output_folder, f"{patient['id']}.png")
    img.save(file_path)

    print(f"✅ QR created for ID {patient['id']}")

conn.close()

print("🎉 All QR codes generated successfully!")