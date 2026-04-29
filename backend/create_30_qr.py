import qrcode
import os

# Folder to save QR codes
folder = "patient_qr_codes"
os.makedirs(folder, exist_ok=True)

for i in range(1, 31):
    qr = qrcode.QRCode(
        version=1,
        box_size=12,
        border=4
    )

    qr.add_data(str(i))   # ✅ ONLY ID
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    img.save(f"{folder}/{i}.png")

    print(f"✅ Created QR for Patient {i}")

print("🎉 All 30 QR codes ready!")