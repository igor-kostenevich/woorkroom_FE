export interface IModalProvider {
  openedSubTabId: Ref<number>;
  openedSubTabData: Ref<Record<string, any>>;
  openSubTab: (id: number, data?: Record<string, any>) => void;
  hideSubTab: () => void;
}
