import { apiStore } from "@/shared/apiSlice/api";
import type { AllTasksDto } from "../model/types";

const tasksApi = apiStore
  .enhanceEndpoints({ addTagTypes: ["Tasks"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllTasks: builder.query<AllTasksDto, null>({
        query: () => ({
          url: "tasks/allTasks",
        }),
        providesTags: (result) =>
          result && result.tasks
            ? [
                ...result.tasks.map(({ id }) => ({
                  id,
                  type: "Tasks" as const,
                })),
                { id: "LIST", type: "Tasks" },
              ]
            : [{ id: "LIST", type: "Tasks" }],
      }),
    }),
  });

export const { useLazyGetAllTasksQuery, useGetAllTasksQuery } = tasksApi;
