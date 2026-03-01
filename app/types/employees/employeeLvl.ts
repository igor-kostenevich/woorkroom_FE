export enum EmployeeLevel {
  JUNIOR = 1,
  MIDDLE = 2,
  SENIOR = 3,
}

export type TEmployeeLvl = keyof typeof EmployeeLevel;
