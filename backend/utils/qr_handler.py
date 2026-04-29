import qrcode

def generate_qr(data, filename="patient_qr.png"):
    qr = qrcode.make(str(data))
    qr.save(filename)
    return filename
