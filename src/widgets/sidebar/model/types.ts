export type DataItemForSidebar<T> = {
  icon: any;
  event: () => Promise<T>;
  text: string;
};
