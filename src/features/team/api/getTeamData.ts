import { apiStore } from "@/shared/apiSlice/api";
import { TeamDataDto } from "../model/types";

const getTeamData = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query<TeamDataDto, null>({
      query: () => ({ url: "/team/getTeam" }),
    }),
  }),
});

export const { useGetTeamQuery } = getTeamData;
