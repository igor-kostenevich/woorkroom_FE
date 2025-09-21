export interface IUserCardData {
  gap?: number;
  cardData: {
    componentName: string | Component;
    data: object;
  }[];
  isButton: boolean;
}
