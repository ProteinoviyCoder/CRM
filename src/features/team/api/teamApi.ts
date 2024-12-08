import { apiStore } from "@/shared/apiSlice/api";
import { TeamDataDto } from "../model/types";

const teamApi = apiStore
  .enhanceEndpoints({ addTagTypes: ["Team"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTeam: builder.query<TeamDataDto, null>({
        query: () => ({ url: "/team/getTeam" }),
        providesTags: (result) =>
          result && result.team
            ? [
                ...result.team.map(({ username }) => ({
                  type: "Team" as const,
                  id: username,
                })),
                { type: "Team", id: "LIST" },
              ]
            : [{ type: "Team", id: "LIST" }],
      }),
      addNewWorker: builder.mutation<null, any>({
        query: (body) => ({
          url: "team/addNewWorker",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "Team", id: "LIST" }],
      }),
    }),
  });

export const { useGetTeamQuery, useLazyGetTeamQuery, useAddNewWorkerMutation } =
  teamApi;
