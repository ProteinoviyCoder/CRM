import { apiStore } from "@/shared/apiSlice/api";

const changeThemeSettings = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    changeUserThemeSetting: builder.mutation({
      query: (body) => ({
        url: "userTheme",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useChangeUserThemeSettingMutation } = changeThemeSettings;
