from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

# Cargar modelo y columnas
model = joblib.load('modelo_entrenado.pkl')
columnas = joblib.load('columnas_modelo.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/ping', methods=['GET'])
def ping():
    return "pong", 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        input_df = pd.DataFrame([input_data])

        input_df = pd.get_dummies(input_df)
        input_df = input_df.reindex(columns=columnas, fill_value=0)

        # [ [prob_no, prob_yes] ]
        print(model.predict_proba(input_df))

        proba = model.predict_proba(input_df)[0][1]

        return jsonify({'probabilidad_renuncia': round(proba, 4),
                        'prediccion': 'Yes' if proba > 0.5 else 'No'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
