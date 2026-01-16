export enum EmployeeLevel {
  Junior = 1,
  Middle = 2,
  Senior = 3,
}

export type TEmployeeLvl = keyof typeof EmployeeLevel;
