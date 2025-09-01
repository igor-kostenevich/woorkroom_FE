export interface IModalOptions {
  /** When false, the modal will not have a close button (x) and will not close when clicking outside or pressing escape */
  closable?: boolean;
  /** When true then all previous modals will be closed */
  closePrevModals?: boolean;
  /** When true then the modal window will be added to the queue and opened only after all previous ones are closed */
  addToQueue?: boolean;
  /** When false the modal window will not auto close when changing the route */
  closeWhenRouteChanges?: boolean;
  /** When true the modal window will show UI tabs steps */
  showSteps?: boolean;
}

export interface IModal {
  name: string;
  data?: Record<string, any>;
  options?: IModalOptions;
}
