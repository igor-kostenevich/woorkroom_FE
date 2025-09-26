export interface IEntityCardCell {
  componentName: string | Component;
  data: Record<string, unknown>;
}

export type IEntityCardRow = IEntityCardCell[];

export interface IEntityCardTable {
  firstElementWidth?: number;
  cardsData: IEntityCardCell[][];
  isButton: boolean;
}
