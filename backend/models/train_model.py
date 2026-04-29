import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Sample data
data = {
    'age': [10, 25, 60, 45],
    'weight': [30, 70, 65, 80],
    'dosage_taken': [200, 600, 800, 1000],
    'safe_limit': [300, 700, 700, 900],
    'overdose': [0, 0, 1, 1]
}

df = pd.DataFrame(data)

X = df[['age','weight','dosage_taken','safe_limit']]
y = df['overdose']

model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, 'ml_model.pkl')

# Print confirmation
print("Model trained and saved successfully.")
