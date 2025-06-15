import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler

# Cargar datos
dataset = pd.read_csv("WA_Fn-UseC_-HR-Employee-Attrition.csv")

# Eliminar columnas irrelevantes
dataset = dataset.drop(['EmployeeCount', 'StandardHours', 'Over18', 'EmployeeNumber'], axis=1)
dataset['Attrition'] = dataset['Attrition'].map({'Yes': 1, 'No': 0})

# Codificación
cat_cols = dataset.select_dtypes(include='object').columns
dataset_encoded = pd.get_dummies(dataset, columns=cat_cols, drop_first=True)

# Variables
y = dataset_encoded['Attrition']
X = dataset_encoded.drop('Attrition', axis=1)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# División
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42, stratify=y)

joblib.dump(X.columns.tolist(), 'columnas_modelo.pkl')
joblib.dump(scaler, 'escalador.pkl')

#Modelo 1
logistic_model = LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42)
logistic_model.fit(X_train, y_train)

# Evaluar el modelo
y_pred = logistic_model.predict(X_test)

print("Modelo Regresión Logística:")
print("Matriz de Confusión:")
print(confusion_matrix(y_test, y_pred))

print("\nReporte de Clasificación:")
print(classification_report(y_test, y_pred))

# Guardar modelo y columnas
joblib.dump(logistic_model, 'modelo_logistic_regression.pkl')


#Modelo 2
peso = len(y_train[y_train == 0]) / len(y_train[y_train == 1])

xgb_model = XGBClassifier(scale_pos_weight=peso, eval_metric='logloss')
xgb_model.fit(X_train, y_train)

y_pred = xgb_model.predict(X_test)


print("\n\nModelo XGBoost:")
print("Matriz de Confusión:")
print(confusion_matrix(y_test, y_pred))

print("\nReporte de Clasificación:")
print(classification_report(y_test, y_pred))

joblib.dump(xgb_model, 'modelo_xgboost.pkl')

