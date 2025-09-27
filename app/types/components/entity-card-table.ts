export interface IEntityCardCell {
  componentName: string | Component;
  data: Record<string, unknown>;
}

export type IEntityCardRow = IEntityCardCell[];

export interface IEntityCardTable {
  firstColumnWidth?: number;
  cardsData: IEntityCardCell[][];
  showActionButton: boolean;
}
