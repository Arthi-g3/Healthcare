import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Load dataset
data = pd.read_csv("medical_200_dataset.csv")

# Convert Medicine to number
data['Medicine'] = data['Medicine'].astype('category').cat.codes

X = data.drop("Outcome", axis=1)
y = data["Outcome"]

model = RandomForestClassifier()
model.fit(X, y)

def predict_risk(input_data):
    return int(model.predict([input_data])[0])