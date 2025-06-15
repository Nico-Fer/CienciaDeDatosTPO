import React, { useState } from 'react';
import { User, Briefcase, DollarSign, TrendingUp, Brain, BarChart3 } from 'lucide-react';
import { FormField } from './components/FormField';
import { FormSection } from './components/FormSection';
import { RatingScale } from './components/RatingScale';
import { PredictionResult } from './components/PredictionResult';
import { EmployeeData, getInitialEmployeeData } from './types/Employee';
import { fieldOptions, fieldDescriptions } from './data/fieldOptions';
import { predictAttrition } from './utils/predictAttrition';

function App() {
  const [selectedModel, setSelectedModel] = useState<'logistic' | 'xgboost'>('logistic');

  const [formData, setFormData] = useState<EmployeeData>(getInitialEmployeeData());
  const [prediction, setPrediction] = useState<{
    prediccion: 'Yes' | 'No';
    probabilidad_renuncia: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (name: string, value: string | number) => {
    if (name === 'MonthlyIncome' && typeof value === 'number') {
      const monthlyIncome = value;
      const hourlyRate = Math.round(monthlyIncome / 160);
      const dailyRate = Math.round(monthlyIncome / 22);

      setFormData(prev => ({
        ...prev,
        MonthlyIncome: monthlyIncome,
        HourlyRate: hourlyRate,
        DailyRate: dailyRate,
        MonthlyRate: monthlyIncome,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const predictionFetch = await predictAttrition({ ...formData, modelo: selectedModel });
      console.log('Prediction response:', predictionFetch);
      setPrediction(predictionFetch);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData(getInitialEmployeeData());
    setPrediction(null);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <Brain className='h-12 w-12 text-blue-600 mr-3' />
            <h1 className='text-4xl font-bold text-gray-900'>Predicción de Rotación de Empleados</h1>
          </div>
          <p className='text-lg text-gray-600'>
            Predice si un empleado es probable que se quede o se vaya de la empresa utilizando datos de su
            perfil y desempeño laboral.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Personal Information */}
          <FormSection title='Información Personal' icon={<User className='h-5 w-5' />}>
            <FormField
              label='Edad'
              name='Age'
              type='number'
              value={formData.Age}
              onChange={handleFieldChange}
              min={18}
              max={65}
              required
            />
            <FormField
              label='Género'
              name='Gender'
              type='select'
              value={formData.Gender}
              onChange={handleFieldChange}
              options={fieldOptions.gender}
              required
            />
            <FormField
              label='Estado Civil'
              name='MaritalStatus'
              type='select'
              value={formData.MaritalStatus}
              onChange={handleFieldChange}
              options={fieldOptions.maritalStatus}
              required
            />
            <FormField
              label='Distancia desde el Hogar (km)'
              name='DistanceFromHome'
              type='number'
              value={formData.DistanceFromHome}
              onChange={handleFieldChange}
              min={0}
              required
            />
          </FormSection>

          {/* Education & Background */}
          <FormSection title='Educación y Antecedentes' icon={<BarChart3 className='h-5 w-5' />}>
            <RatingScale
              label='Nivel Educativo'
              name='Education'
              value={formData.Education}
              onChange={handleFieldChange}
              min={1}
              max={5}
              description={fieldDescriptions.education}
              required
            />
            <FormField
              label='Campo de Estudio'
              name='EducationField'
              type='select'
              value={formData.EducationField}
              onChange={handleFieldChange}
              options={fieldOptions.educationField}
              required
            />
            <FormField
              label='Total de Años Trabajados'
              name='TotalWorkingYears'
              type='number'
              value={formData.TotalWorkingYears}
              onChange={handleFieldChange}
              min={0}
              required
            />
            <FormField
              label='Número de Empresas en las que ha Trabajado'
              name='NumCompaniesWorked'
              type='number'
              value={formData.NumCompaniesWorked}
              onChange={handleFieldChange}
              min={0}
              required
            />
          </FormSection>

          {/* Job Details */}
          <FormSection title='Información del Trabajo' icon={<Briefcase className='h-5 w-5' />}>
            <FormField
              label='Departamento'
              name='Department'
              type='select'
              value={formData.Department}
              onChange={handleFieldChange}
              options={fieldOptions.department}
              required
            />
            <FormField
              label='Rol Laboral'
              name='JobRole'
              type='select'
              value={formData.JobRole}
              onChange={handleFieldChange}
              options={fieldOptions.jobRole}
              required
            />
            <RatingScale
              label='Nivel Laboral'
              name='JobLevel'
              value={formData.JobLevel}
              onChange={handleFieldChange}
              min={1}
              max={5}
              description={fieldDescriptions.jobLevel}
              required
            />
            <FormField
              label='Viajes de Negocios'
              name='BusinessTravel'
              type='select'
              value={formData.BusinessTravel}
              onChange={handleFieldChange}
              options={fieldOptions.businessTravel}
              required
            />
            <FormField
              label='Horas Extras'
              name='OverTime'
              type='select'
              value={formData.OverTime}
              onChange={handleFieldChange}
              options={fieldOptions.overTime}
              required
            />
            <FormField
              label='Años en la Empresa'
              name='YearsAtCompany'
              type='number'
              value={formData.YearsAtCompany}
              onChange={handleFieldChange}
              min={0}
              required
            />
            <FormField
              label='Años en el Rol Actual'
              name='YearsInCurrentRole'
              type='number'
              value={formData.YearsInCurrentRole}
              onChange={handleFieldChange}
              min={0}
              required
            />
            <FormField
              label='Años desde la Última Promoción'
              name='YearsSinceLastPromotion'
              type='number'
              value={formData.YearsSinceLastPromotion}
              onChange={handleFieldChange}
              min={0}
              required
            />
            <FormField
              label='Años con el Gerente Actual'
              name='YearsWithCurrManager'
              type='number'
              value={formData.YearsWithCurrManager}
              onChange={handleFieldChange}
              min={0}
              required
            />
          </FormSection>

          {/* Compensation */}
          <FormSection title='Compensación y Beneficios' icon={<DollarSign className='h-5 w-5' />}>
            <FormField
              label='Ingreso Mensual'
              name='MonthlyIncome'
              type='number'
              value={formData.MonthlyIncome}
              onChange={handleFieldChange}
              min={0}
              required
            />
            <FormField
              label='Tarifa por Hora'
              name='HourlyRate'
              type='number'
              value={formData.HourlyRate}
              onChange={handleFieldChange}
            />

            <FormField
              label='Tarifa Diaria'
              name='DailyRate'
              type='number'
              value={formData.DailyRate}
              onChange={handleFieldChange}
            />

            <FormField
              label='Tarifa Mensual'
              name='MonthlyRate'
              type='number'
              value={formData.MonthlyRate}
              onChange={handleFieldChange}
            />

            <FormField
              label='Incremento Salarial (%)'
              name='PercentSalaryHike'
              type='number'
              value={formData.PercentSalaryHike}
              onChange={handleFieldChange}
              min={0}
              max={100}
              required
            />
            <RatingScale
              label='Nivel de Stock Options'
              name='StockOptionLevel'
              value={formData.StockOptionLevel}
              onChange={handleFieldChange}
              min={0}
              max={3}
              description={fieldDescriptions.stockOptionLevel}
              required
            />
          </FormSection>

          {/* Performance & Satisfaction */}
          <FormSection title='Desempeño y Satisfacción' icon={<TrendingUp className='h-5 w-5' />}>
            <RatingScale
              label='Calificación de Desempeño'
              name='PerformanceRating'
              value={formData.PerformanceRating}
              onChange={handleFieldChange}
              min={1}
              max={4}
              description={fieldDescriptions.performanceRating}
              required
            />
            <RatingScale
              label='Satisfacción Laboral'
              name='JobSatisfaction'
              value={formData.JobSatisfaction}
              onChange={handleFieldChange}
              min={1}
              max={4}
              description={fieldDescriptions.jobSatisfaction}
              required
            />
            <RatingScale
              label='Satisfacción del Entorno'
              name='EnvironmentSatisfaction'
              value={formData.EnvironmentSatisfaction}
              onChange={handleFieldChange}
              min={1}
              max={4}
              description={fieldDescriptions.environmentSatisfaction}
              required
            />
            <RatingScale
              label='Involucramiento Laboral'
              name='JobInvolvement'
              value={formData.JobInvolvement}
              onChange={handleFieldChange}
              min={1}
              max={4}
              description={fieldDescriptions.jobInvolvement}
              required
            />
            <RatingScale
              label='Satisfacción de la Relación'
              name='RelationshipSatisfaction'
              value={formData.RelationshipSatisfaction}
              onChange={handleFieldChange}
              min={1}
              max={4}
              description={fieldDescriptions.relationshipSatisfaction}
              required
            />
            <RatingScale
              label='Equilibrio entre Trabajo y Vida Personal'
              name='WorkLifeBalance'
              value={formData.WorkLifeBalance}
              onChange={handleFieldChange}
              min={1}
              max={4}
              description={fieldDescriptions.workLifeBalance}
              required
            />
            <FormField
              label='Horas de Capacitación el Año Pasado'
              name='TrainingTimesLastYear'
              type='number'
              value={formData.TrainingTimesLastYear}
              onChange={handleFieldChange}
              min={0}
              required
            />
          </FormSection>

          {/* Prediction Result */}
          {prediction && (
            <PredictionResult
              prediction={prediction.prediccion}
              confidence={prediction.probabilidad_renuncia}
            />
          )}

          {/* Action Buttons */}
          {error && <div className='text-red-600 text-center'>{error}</div>}

          <FormSection title='Modelo de Predicción'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <label className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='modelo'
                  value='logistic'
                  checked={selectedModel === 'logistic'}
                  onChange={() => setSelectedModel('logistic')}
                  className='accent-blue-600'
                />
                Regresión Logística
              </label>
              <label className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='modelo'
                  value='xgboost'
                  checked={selectedModel === 'xgboost'}
                  onChange={() => setSelectedModel('xgboost')}
                  className='accent-blue-600'
                />
                XGBoost
              </label>
            </div>
          </FormSection>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              type='submit'
              disabled={isLoading}
              className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                  <span>Prediciendo...</span>
                </div>
              ) : (
                'Predecir Rotación'
              )}
            </button>
            <button
              type='button'
              onClick={resetForm}
              className='px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
            >
              Restablecer Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
