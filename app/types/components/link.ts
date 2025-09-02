export interface ILinkButtonProps {
  to?: string | object;
  iconBefore?: string | 'chevron-left';
  iconAfter?: string | 'chevron-right';
  external?: boolean;
  color?: 'primary' | 'secondary';
  noUnderline?: boolean;
}
