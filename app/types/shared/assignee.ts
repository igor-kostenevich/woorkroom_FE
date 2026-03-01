export interface IAssigneeUser {
  id: string;
  fullName: string;
  userImage?: string;
}

export interface IAssigneeData {
  showLabel: boolean;
  assignees: IAssigneeUser[];
  max: number;
}
