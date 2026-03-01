import type { IAssigneeUser } from '~/types/shared/assignee';

export interface IProjectCard {
  id: string;
  title: string;
  createdAt: string;
  priority: 'Low' | 'Medium' | 'High';
  allTasks: number;
  activeTasks: number;
  imageUrl: string;
  assignees?: IAssigneeUser[];
}
