import type { TEmployeeLvl } from '~/types/employees/employeeLvl';
import type { IUserAvatar } from '~/types/components/userAvatar';

export interface TeamMemberCard {
  level: TEmployeeLvl;
  name: string;
  position: string;
  avatar?: IUserAvatar;
}
