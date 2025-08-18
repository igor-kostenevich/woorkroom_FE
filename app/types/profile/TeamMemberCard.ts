import type { TEmployeeLvl } from '~/types/employees/EmployeeLvl';
import type { IUserAvatar } from '~/types/components/UserAvatar';

export interface TeamMemberCard {
  level: TEmployeeLvl;
  name: string;
  position: string;
  avatar?: IUserAvatar;
}
