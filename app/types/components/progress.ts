import type { IUserAvatar } from '~/types/profile';

export interface ProgressProps {
  size?: IUserAvatar['size'];
  progress?: number;
  color?: 'primary' | 'yellow' | 'blue' | 'red' | 'violet';
  title?: string;
  label?: string;
}
