import type { IAssigneeData } from '~/types/components/assignee';

export interface IProjectCard {
  id: string;
  title: string;
  createdAt: string;
  priority: 'Low' | 'Medium' | 'High';
  allTasks: number;
  activeTasks: number;
  imageUrl: string;
  assignees?: IAssigneeData[];
}
