import type { User } from "@/shared/storeSlices/userSlice";

export type TeamDataDto = {
  message?: string;
  team?: User[];
};
