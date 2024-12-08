import { FC, memo } from "react";
import { Assignment } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import type { BusinessTask } from "@/shared/storeSlices/businessSlice";

type InitialTaskCardProps = {
  taskData: BusinessTask;
};

const InitialTaskCard: FC<InitialTaskCardProps> = ({ taskData }) => {
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
        opacity: taskData.status ? "0.6" : "1",
      }}
    >
      <Box>
        <Assignment sx={{ width: 120, height: 120 }}></Assignment>
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
            <Typography variant="h6">Title: {taskData.title}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography variant="body1">
              Description: {taskData.description}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography variant="body1">
              Status: {taskData.status === true ? "Ready" : "In work"}
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export const TaskCard = memo(InitialTaskCard);
