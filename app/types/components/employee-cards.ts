import type {
  TTaskStatus,
  TLeaveType,
  TRequestStatus,
  EmployeeLevel,
} from '~/types';

interface IUserProfile {
  image: string;
  fullName: string;
  email: string;
}

export interface IEmployeeProfile extends IUserProfile {
  gender: 'male' | 'female';
  birthday: string;
  age: number;
  position: string;
  level: EmployeeLevel;
  details: boolean;
}

export interface IEmployeeStats extends IUserProfile {
  vacations: number;
  sickLeave: number;
  workRemotely: number;
}

export interface ITask {
  taskName: string;
  estimate: string;
  spentTime: string;
  assigneeImage: string;
  fullName: string;
  priority: 'low' | 'medium' | 'high';
  status?: TTaskStatus;
  progress: number;
}

export interface IRequest {
  requestType: TLeaveType;
  duration: string;
  startDay: string;
  endDay: string;
  status: TRequestStatus;
}

export type TMainEmployee =
  | IEmployeeProfile
  | IEmployeeStats
  | ITask
  | IRequest;
