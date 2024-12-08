import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, memo } from "react";
import { DataItemForSidebar } from "../model/types";

type InitialSidebarItemProps = {
  itemSidebar: DataItemForSidebar<void | boolean>;
  isOpenSidebar: boolean;
};

const InitialSidebarItem: FC<InitialSidebarItemProps> = ({
  itemSidebar,
  isOpenSidebar,
}) => {
  const theme = useTheme();

  return (
    <ListItem
      key={itemSidebar.text}
      onClick={() => isOpenSidebar && itemSidebar.event()}
      sx={{
        marginTop: itemSidebar.text === "Log out" ? "auto" : "",
        boxShadow: `0 0 2px 1px ${theme.palette.primary.dark}`,
        transition: "0.3s ease",
        ["&: hover"]: isOpenSidebar
          ? {
              backgroundColor: "primary.dark",
              cursor: "pointer",
            }
          : "",
      }}
    >
      <ListItemIcon>
        <IconButton
          onClick={itemSidebar.event}
          sx={{
            border: `1px solid ${theme.palette.getContrastText(
              theme.palette.primary.main
            )}`,
            backgroundColor: "primary.dark",
            marginRight: "15px",
          }}
        >
          <itemSidebar.icon
            sx={{
              color: theme.palette.getContrastText(theme.palette.primary.dark),
              width: "28px",
              height: "28px",
            }}
          />
        </IconButton>
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1">{itemSidebar.text}</Typography>
      </ListItemText>
    </ListItem>
  );
};

export const SidebarItem = memo(InitialSidebarItem);
