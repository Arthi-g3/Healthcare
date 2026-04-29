# bloodbank.py

import qrcode

def generate_qr(data, filename):
    """
    Generates a QR code image from the given data and saves it to a file.
    
    Parameters:
    - data: str, the information to encode in QR code
    - filename: str, the file name to save the QR code image
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=20,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
