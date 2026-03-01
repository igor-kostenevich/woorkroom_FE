export type PriorityLevel = 'low' | 'medium' | 'high';

export interface IPriorityData {
  priority?: PriorityLevel;
  showLabel?: boolean;
}

export const PRIORITY_MAP: Record<
  PriorityLevel,
  { icon: string; color: string; class: string }
> = {
  low: {
    icon: 'arrow-down',
    color: 'text-green-vivid',
    class: 'transform rotate-180',
  },
  medium: { icon: 'arrow-up', color: 'text-orange', class: '' },
  high: { icon: 'arrow-up', color: 'text-red', class: '' },
} as const;
