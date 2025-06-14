export async function predictAttrition(inputData: Record<string, any>) {
  // console.log('Enviando datos para predecir:', inputData);

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al predecir');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al obtener la predicción:', error);
    throw error;
  }
}
