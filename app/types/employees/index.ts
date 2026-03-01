export enum EmployeeLevel {
  JUNIOR = 1,
  MIDDLE = 2,
  SENIOR = 3,
}

export type TEmployeeLvl = keyof typeof EmployeeLevel;

export interface IEmployee {
  isBusy: boolean;
  progress: number;
  userImage: string;
  fullName: string;
  positionName: string;
  positionLevel: TEmployeeLvl;
  backlogTasksCount: number;
  tasksInProgressCount: number;
  tasksInReviewCount: number;
}

export type IPositionData = Pick<IEmployee, 'positionName' | 'positionLevel'>;
