import { FC, memo } from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import type { User } from "@/shared/storeSlices/userSlice";

type InitialUserCardProps = {
  userData: User;
};

const InitialUserCard: FC<InitialUserCardProps> = ({ userData }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: {
          xs: "0px",
          md: "20px",
        },

        boxShadow: `0 0 5px 5px ${alpha(theme.palette.primary.dark, 0.3)}`,
        borderRadius: "5px",
      }}
    >
      <Box>
        <AccountCircle sx={{ width: 120, height: 120 }}></AccountCircle>
      </Box>
      <List
        sx={{
          padding: 0,
          margin: 0,
          "& .MuiListItem-root": {
            padding: "1px",
            margin: 0,
          },
          "& .MuiListItemText-root": {
            padding: 0,
            margin: 0,
          },
          "& .MuiListItemText-root .MuiTypography-root": {
            textAlign: {
              xs: "center",
              md: "start",
            },
          },
        }}
      >
        <ListItem>
          <ListItemText>
            <Typography variant="h6">Name: {userData.username}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography variant="body1">Role: {userData.role}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography variant="body1">
              Permissions:{" "}
              {typeof userData.permissions === "object"
                ? userData.permissions.join(", ")
                : userData.permissions}
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export const UserCard = memo(InitialUserCard);
