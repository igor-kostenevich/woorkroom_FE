const _LeaveTypes = {
  SICK: 'sick',
  VACATION: 'vacation',
  REMOTE: 'remote',
} as const;

const _VacationStatus = {
  APPROVED: 'approved',
  PENDING: 'pending',
} as const;

export type TVacationStatus =
  (typeof _VacationStatus)[keyof typeof _VacationStatus];
export type TLeaveType = (typeof _LeaveTypes)[keyof typeof _LeaveTypes];
