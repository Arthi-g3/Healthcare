from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import mysql.connector

# Custom modules
from database import init_db
from disaster import disaster_mode
from bloodbank import generate_qr
from overdose import check_overdose
from model import predict_risk   # ML MODEL

app = Flask(__name__)
CORS(app)

# Initialize DB
init_db()

# ---------------- MYSQL CONNECTION ----------------
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Arthi206",
        database="smart_medical_system"
    )

# ---------------- HOME ----------------
@app.route("/")
def home():
    return "Smart Medical System Backend Running Successfully"

# ---------------- REGISTER PATIENT ----------------
@app.route("/register_patient", methods=["POST"])
def register_patient():
    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO patients(name, age, blood_group, disease, medicine, dosage)
        VALUES(%s,%s,%s,%s,%s,%s)
    """, (
        data["name"],
        int(data["age"]),
        data["blood_group"],
        data["disease"],
        data["medicine"],
        float(data["dosage"])
    ))

    patient_id = cursor.lastrowid
    conn.commit()
    conn.close()

    # Generate QR
    generate_qr(str(patient_id), f"patient_{patient_id}.png")

    return jsonify({
        "message": "Patient Registered",
        "patientId": patient_id
    })

# ---------------- GET PATIENT BY ID ----------------
@app.route("/patient/<int:id>", methods=["GET"])
def get_patient(id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM patients WHERE id=%s", (id,))
    patient = cursor.fetchone()

    conn.close()

    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "Patient not found"}), 404

# ---------------- GET PATIENT FROM QR ----------------
@app.route("/patient_from_qr", methods=["POST"])
def patient_from_qr():
    data = request.json
    qr_text = data.get("qr_text", "")

    try:
        patient_id = int(qr_text)

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM patients WHERE id=%s", (patient_id,))
        patient = cursor.fetchone()

        if not patient:
            conn.close()
            return jsonify({"error": "Patient not found"}), 404

        cursor.execute("SELECT * FROM prescriptions WHERE patient_id=%s", (patient_id,))
        prescription = cursor.fetchone()

        conn.close()

        return jsonify({
            "patientId": patient["id"],
            "name": patient["name"],
            "age": patient["age"],
            "blood_group": patient["blood_group"],
            "disease": patient["disease"],
            "medicine": prescription["medicine"] if prescription else patient["medicine"],
            "dosage": prescription["dosage"] if prescription else patient["dosage"]
        })

    except:
        return jsonify({"error": "Invalid QR"}), 400

# ---------------- PREDICT (ML - FINAL) ----------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        input_data = [
            int(data["Age"]),
            float(data["Weight"]),
            float(data["HeartRate"]),
            float(data["Oxygen"]),
            int(data["Medicine"]),
            float(data["Dosage_mg"]),
            float(data["Max_Dosage_mg"]),
            int(data["Times_Per_Day"])
        ]

        result = predict_risk(input_data)

        return jsonify({
            "result": "⚠ High Risk" if result == 1 else "✅ Safe"
        })

    except Exception as e:
        print("Prediction Error:", e)
        return jsonify({"error": "Prediction failed"}), 500

# ---------------- PRESCRIPTION ----------------
@app.route("/prescription", methods=["POST"])
def prescription():
    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO prescriptions(patient_id, medicine, dosage)
        VALUES(%s,%s,%s)
    """, (
        data["patient_id"],
        data["medicine"],
        float(data["dosage"])
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Prescription added"})

# ---------------- DISASTER MODE ----------------
@app.route("/doctor_verification", methods=["POST"])
def doctor_verification():
    try:
        data = request.get_json()

        patient_id = data["patient_id"]
        heart_rate = float(data["heart_rate"])
        oxygen = float(data["oxygen"])

        if heart_rate > 110 or oxygen < 90:
            message = f"⚠ Emergency verification needed for patient {patient_id}. Doctor attention required."
        else:
            message = f"✅ Patient {patient_id} is stable. No urgent verification needed."

        return jsonify({"message": message}), 200

    except Exception as e:
        print("Doctor verification error:", e)
        return jsonify({"error": str(e)}), 500

# ---------------- BLOOD BANK ----------------
@app.route("/bloodbank", methods=["POST"])
def bloodbank():
    try:
        data = request.get_json()

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO bloodbank(name, blood_group, contact)
            VALUES(%s,%s,%s)
        """, (
            data["name"],
            data["blood_group"],
            data["contact"]
        ))

        donor_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return jsonify({
            "message": "Donor added successfully",
            "donor_id": donor_id
        }), 200

    except Exception as e:
        print("Bloodbank error:", e)
        return jsonify({"error": str(e)}), 500
# ---------------- VIEW DONORS ----------------
@app.route("/view_donors", methods=["GET"])
def view_donors():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM bloodbank")
        donors = cursor.fetchall()

        conn.close()

        return jsonify(donors), 200

    except Exception as e:
        print("View donors error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/delete_donor/<int:id>", methods=["DELETE"])
def delete_donor(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM bloodbank WHERE id=%s", (id,))
        conn.commit()
        conn.close()

        return jsonify({"message": "Donor deleted successfully"}), 200

    except Exception as e:
        print("Delete donor error:", e)
        return jsonify({"error": str(e)}), 500
# ---------------- MEDICINE HISTORY ----------------
@app.route("/medicine_history/<int:patient_id>", methods=["GET"])
def medicine_history(patient_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT * FROM medication_history
            WHERE patient_id=%s
            ORDER BY time_taken DESC
        """, (patient_id,))

        data = cursor.fetchall()
        conn.close()

        return jsonify(data), 200

    except Exception as e:
        print("Medicine history error:", e)
        return jsonify({"error": str(e)}), 500

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True, port=4000)