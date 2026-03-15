export enum TaskStatus {
  TO_DO = 'to-do',
  IN_PROGRESS = 'in-progress',
  IN_REVIEW = 'in-review',
  DONE = 'done',
}

export type TTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
