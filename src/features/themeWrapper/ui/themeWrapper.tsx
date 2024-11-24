import { useAppDispatch, useAppSelector } from "@/shared/hooks/apiHooks";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FC, memo, ReactNode, useEffect, useState } from "react";
import {
  actionSetTheme,
  actionSetThemeMode,
} from "@/shared/storeSlices/themeSlice";
import { themes } from "@/shared/themes/themes";
import type { ModeTheme } from "@/shared/storeSlices/themeSlice";

type InitialThemeWrapperProps = {
  children: ReactNode;
};

const InititalThemeWrapper: FC<InitialThemeWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { theme: themeState, mod } = useAppSelector((state) => state.theme);
  const userThemSetting = useAppSelector(
    (state) => state.user.user?.themeSetting
  );

  const theme = createTheme({
    palette: themeState[mod],
  });

  useEffect(() => {
    if (userThemSetting?.theme && userThemSetting?.mod) {
      for (let i in themes) {
        if (userThemSetting.theme.toLowerCase() === i.toLowerCase()) {
          dispatch(actionSetTheme(themes[i].palettes));
          dispatch(actionSetThemeMode(userThemSetting.mod as ModeTheme));
          return;
        }
      }
    }
  }, [userThemSetting]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const ThemeWrapper = memo(InititalThemeWrapper);