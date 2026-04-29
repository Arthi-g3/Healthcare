import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Arthi206",
    "database": "smart_medical_system"
}

def init_db():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Arthi206"
    )

    cursor = conn.cursor()

    # Create database
    cursor.execute("CREATE DATABASE IF NOT EXISTS smart_medical_system")
    cursor.execute("USE smart_medical_system")

    # Patients table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        age INT,
        blood_group VARCHAR(10),
        disease VARCHAR(100),
        medicine VARCHAR(100),
        dosage FLOAT
    )
    """)

    # Prescriptions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prescriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT,
        medicine VARCHAR(100),
        dosage FLOAT,
        FOREIGN KEY (patient_id) REFERENCES patients(id)
    )
    """)

    # Bloodbank table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS bloodbank (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        blood_group VARCHAR(10) NOT NULL,
        contact VARCHAR(20) NOT NULL
    )
    """)

    # Medication history table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS medication_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT,
        medicine_name VARCHAR(100),
        dosage FLOAT,
        time_taken DATETIME,
        FOREIGN KEY (patient_id) REFERENCES patients(id)
    )
    """)

    conn.commit()
    conn.close()