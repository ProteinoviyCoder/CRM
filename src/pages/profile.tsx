import {
  Box,
  Divider,
  Typography,
  TextField,
  MenuItem,
  ListItem,
  List,
  Switch,
  Container,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { UserCard } from "@/features/team/ui/userCard";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/apiHooks";
import {
  actionSetTheme,
  actionSetThemeMode,
} from "@/shared/storeSlices/themeSlice";
import { themes } from "@/shared/themes/themes";
import {
  actionSetUserTheme,
  actionSetUserThemeMod,
} from "@/shared/storeSlices/userSlice";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useChangeUserThemeSettingMutation } from "@/features/themeWrapper/api/changeThemeSettings";

const profile: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.user);
  const themeSettings = useAppSelector((state) => state.theme);
  const userThemSetting = useAppSelector(
    (state) => state.user.user?.themeSetting
  );
  const [funcChangeUserThemeSettings] = useChangeUserThemeSettingMutation();

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (!isFirstRender) {
      funcChangeUserThemeSettings({
        themeSetting: userThemSetting,
      });
    }
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [themeSettings]);

  return (
    <Box>
      <UserCard userData={userData!}></UserCard>
      <Divider sx={{ margin: "25px 0 10px" }} />
      <Typography variant="h4">Settings:</Typography>
      <Divider sx={{ margin: "10px 0 10px" }} />
      <List
        sx={{
          "& .MuiListItem-root": {
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "flex-start",
            gap: "40px",
          },
        }}
      >
        <ListItem
          sx={{
            "& .MuiBox-root": {
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            },
          }}
        >
          <Box>
            <Typography variant="h6">Theme: </Typography>
            <TextField
              label="Select your theme"
              value={
                userData?.themeSetting.theme
                  ? userData?.themeSetting.theme
                  : "standart"
              }
              sx={{ minWidth: "200px" }}
              select
              onChange={(e) => {
                const name = e.target.value;
                for (let i in themes) {
                  if (i.toLowerCase().includes(name.toLowerCase())) {
                    dispatch(actionSetTheme(themes[i].palettes));
                    dispatch(actionSetUserTheme(i));

                    return;
                  }
                }
              }}
            >
              <MenuItem value="standart">Standart</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="pink">Pink</MenuItem>
              <MenuItem value="peach">Peach</MenuItem>
            </TextField>
          </Box>

          <Box>
            <Typography variant="h6">Theme-Mode: </Typography>
            <Container
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "5px 10px",
                borderRadius: "10px",
                // backgroundColor: "#898989",
                border: `1px solid ${theme.palette.text.primary}`,
              })}
            >
              <LightMode
                sx={{
                  color: "#FFA500",
                  backgroundColor: "#efefef",
                  padding: "5px",
                  borderRadius: "100%",
                  width: "35px",
                  height: "35px",
                }}
              />
              <Switch
                checked={
                  userData?.themeSetting.mod === "light"
                    ? false
                    : userData?.themeSetting.mod === "dark"
                    ? true
                    : false
                }
                onChange={(e) => {
                  if (!e.target.checked) {
                    dispatch(actionSetThemeMode("light"));
                    dispatch(actionSetUserThemeMod("light"));
                  } else if (e.target.checked) {
                    dispatch(actionSetThemeMode("dark"));
                    dispatch(actionSetUserThemeMod("dark"));
                  }
                }}
              />
              <DarkMode
                sx={{
                  color: "#F0F8FF",
                  backgroundColor: "#0f0f0f",
                  padding: "5px",
                  borderRadius: "100%",
                  width: "35px",
                  height: "35px",
                }}
              />
            </Container>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default profile;
