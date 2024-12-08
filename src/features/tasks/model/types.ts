import type { BusinessTask } from "@/shared/storeSlices/businessSlice";

export type AllTasksDto = {
  message: string;
  tasks?: BusinessTask[];
};
