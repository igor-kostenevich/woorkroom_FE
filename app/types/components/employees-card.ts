import type { EmployeeLevel } from '@/types/employees/EmployeeLvl';

export interface IEmployeesCardData {
  isBusy?: boolean;
  progress?: number;
  userImage?: string;
  fullName?: string;
  positionName?: string;
  positionLevel?: EmployeeLevel;
  backlogTasks?: number;
  tasksInProgress?: number;
  tasksInReview?: number;
}
