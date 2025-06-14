export interface EmployeeData {
  Age: number | string;
  BusinessTravel: string;
  DailyRate: number;
  Department: string;
  DistanceFromHome: number | string;
  Education: number;
  EducationField: string;
  EnvironmentSatisfaction: number;
  Gender: string;
  HourlyRate: number;
  JobInvolvement: number;
  JobLevel: number;
  JobRole: string;
  JobSatisfaction: number;
  MaritalStatus: string;
  MonthlyIncome: number | string;
  MonthlyRate: number;
  NumCompaniesWorked: number | string;
  OverTime: string;
  PercentSalaryHike: number;
  PerformanceRating: number;
  RelationshipSatisfaction: number;
  StockOptionLevel: number;
  TotalWorkingYears: number | string;
  TrainingTimesLastYear: number;
  WorkLifeBalance: number;
  YearsAtCompany: number | string;
  YearsInCurrentRole: number | string;
  YearsSinceLastPromotion: number | string;
  YearsWithCurrManager: number | string;
}

export const getInitialEmployeeData = (): EmployeeData => ({
  Age: '',
  BusinessTravel: '',
  DailyRate: 0,
  Department: '',
  DistanceFromHome: '',
  Education: 1,
  EducationField: '',
  EnvironmentSatisfaction: 1,
  Gender: '',
  HourlyRate: 0,
  JobInvolvement: 1,
  JobLevel: 1,
  JobRole: '',
  JobSatisfaction: 1,
  MaritalStatus: '',
  MonthlyIncome: '',
  MonthlyRate: 0,
  NumCompaniesWorked: '',
  OverTime: '',
  PercentSalaryHike: 0,
  PerformanceRating: 1,
  RelationshipSatisfaction: 1,
  StockOptionLevel: 0,
  TotalWorkingYears: '',
  TrainingTimesLastYear: 0,
  WorkLifeBalance: 1,
  YearsAtCompany: '',
  YearsInCurrentRole: '',
  YearsSinceLastPromotion: '',
  YearsWithCurrManager: '',
});
