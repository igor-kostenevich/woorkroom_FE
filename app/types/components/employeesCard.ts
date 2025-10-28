import type { EmployeeLevel } from '~/types/employees/employeeLvl';

export interface IEmployeesCardData {
  isBusy?: boolean;
  progress?: number;
  userImage?: string;
  fullName?: string;
  positionName?: string;
  positionLevel?: EmployeeLevel;
  backlogTasksCount?: number;
  tasksInProgressCount?: number;
  tasksInReviewCount?: number;
}
