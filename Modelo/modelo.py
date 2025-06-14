import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# Cargar datos
dataset = pd.read_csv("WA_Fn-UseC_-HR-Employee-Attrition.csv")

# Eliminar columnas irrelevantes
dataset = dataset.drop(['EmployeeCount', 'StandardHours', 'Over18', 'EmployeeNumber'], axis=1)

# Codificar variable objetivo
dataset['Attrition'] = dataset['Attrition'].map({'Yes': 1, 'No': 0})

# Codificar variables categóricas
cat_cols = dataset.select_dtypes(include='object').columns
dataset_encoded = pd.get_dummies(dataset, columns=cat_cols, drop_first=True)

# Separar variables
y = dataset_encoded['Attrition']
X = dataset_encoded.drop('Attrition', axis=1)

# División en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Entrenar modelo
model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train, y_train)

# Evaluar modelo
y_pred = model.predict(X_test)
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Guardar modelo y columnas
joblib.dump(model, 'modelo_entrenado.pkl')
joblib.dump(X.columns.tolist(), 'columnas_modelo.pkl')
