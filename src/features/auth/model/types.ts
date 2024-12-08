import type { User } from "@/shared/storeSlices/userSlice";
import type { BusinessTask } from "@/shared/storeSlices/businessSlice";

export type ResAuthDto = {
  status?: number;
  message?: string;
  userForResponse?: User;
  tasks?: BusinessTask[];
  businessName?: string;
};
