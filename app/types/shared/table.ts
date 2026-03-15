export type TableColumnComponent = object;

export interface ITableColumn {
  key: string;
  component: TableColumnComponent;
}

export interface ITableProps {
  columns: ITableColumn[];
  rows: Record<string, unknown>[];
  firstColumnWidth?: number;
  showActionButton?: boolean;
}
