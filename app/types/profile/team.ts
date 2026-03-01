import type { TEmployeeLvl } from '~/types/employees/empoyeeLvl';
import type { IUserAvatar } from '~/types/components/userAvatar';

export interface Team {
  level: TEmployeeLvl;
  name: string;
  position: string;
  avatar?: IUserAvatar;
}
