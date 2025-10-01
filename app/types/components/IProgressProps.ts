import type { IUserAvatar } from '~/types/components/UserAvatar';

export interface IProgressProps {
  size?: IUserAvatar['size'];
  progress?: number;
  color?: 'primary' | 'yellow' | 'blue' | 'red' | 'violet';
  title?: string;
  label?: string;
}
