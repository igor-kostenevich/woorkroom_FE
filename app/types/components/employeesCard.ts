import type { TEmployeeLvl } from '~/types/employees/employeeLvl';

export interface IEmployeesCardData {
  isBusy?: boolean;
  progress?: number;
  userImage?: string;
  fullName?: string;
  positionName?: string;
  positionLevel?: TEmployeeLvl;
  backlogTasksCount?: number;
  tasksInProgressCount?: number;
  tasksInReviewCount?: number;
}
