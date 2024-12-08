export type DataItemForSidebar<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  event: () => Promise<T>;
  text: string;
  isAccess: boolean;
};
