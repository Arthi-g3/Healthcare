import requests
from pprint import pprint

BASE_URL = "http://127.0.0.1:5000"

def test_predict():
    print("=== /predict Endpoint ===")
    payload = {
        "age": 25,
        "weight": 70,
        "dosage": 500
    }
    response = requests.post(f"{BASE_URL}/predict", json=payload)
    try:
        pprint(response.json())
    except Exception:
        print("Failed to parse JSON. Raw response:")
        print(response.text)

def test_disaster():
    print("=== /disaster Endpoint ===")
    payload = {"level": "high"}
    response = requests.post(f"{BASE_URL}/disaster", json=payload)
    try:
        pprint(response.json())
    except Exception:
        print(response.text)

def test_bloodbank():
    print("=== /bloodbank Endpoint ===")
    payload = {
        "name": "John Doe",
        "blood_group": "O+",
        "contact": "1234567890"
    }
    response = requests.post(f"{BASE_URL}/bloodbank", json=payload)
    try:
        pprint(response.json())
    except Exception:
        print(response.text)

if __name__ == "__main__":
    print("Starting Backend API Tests...")
    test_predict()
    test_disaster()
    test_bloodbank()




