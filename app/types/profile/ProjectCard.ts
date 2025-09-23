export interface IProjectCard {
  id: string;
  title: string;
  createdAt: string;
  priority: 'Low' | 'Medium';
  allTasks: number;
  activeTasks: number;
  imageUrl: string;
  assignees?: IAssignee[];
}
