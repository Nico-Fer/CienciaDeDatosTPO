from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

# Cargar modelo y columnas
logistic_model = joblib.load('modelo_logistic_regression.pkl')
xgb_model = joblib.load('modelo_xgboost.pkl')
columnas = joblib.load('columnas_modelo.pkl')
scaler = joblib.load('escalador.pkl')  # solo para el modelo logístico

app = Flask(__name__)
CORS(app)

@app.route('/ping', methods=['GET'])
def ping():
    return "pong", 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        payload = request.get_json()

        # Control: elegir modelo (si no se manda, usa logistic por defecto)
        modelo_seleccionado = payload.get('modelo', 'logistic')
        input_data = {k: v for k, v in payload.items() if k != 'modelo'}

        print(f"Modelo seleccionado: {modelo_seleccionado}")
        # print(f"Datos de entrada: {input_data}")

        input_df = pd.DataFrame([input_data])

        input_df = pd.get_dummies(input_df)
        input_df = input_df.reindex(columns=columnas, fill_value=0)

        if modelo_seleccionado == 'logistic':
            input_scaled = scaler.transform(input_df)
            proba = logistic_model.predict_proba(input_scaled)[0][1]
        elif modelo_seleccionado == 'xgboost':
            proba = xgb_model.predict_proba(input_df)[0][1]
        else:
            return jsonify({'error': 'Modelo no válido. Usa "logistic" o "xgboost".'}), 400

        return jsonify({
            'modelo_usado': modelo_seleccionado,
            'probabilidad_renuncia': round(float(proba), 4),
            'prediccion': 'Yes' if proba > 0.5 else 'No',
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
