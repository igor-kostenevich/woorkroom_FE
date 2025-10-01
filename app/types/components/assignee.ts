export interface IUserData {
  id: string;
  userImage?: string;
  fullName: string;
}

export interface IAssigneeData {
  showLabel?: boolean;
  userAvatarData?: IUserData[];
  max?: number;
}
