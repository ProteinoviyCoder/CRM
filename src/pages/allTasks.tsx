import { useGetAllTasksQuery } from "@/features/tasks/api/tasksApi";
import { TaskCard } from "@/features/tasks/ui/taskCard";
import { useAppSelector } from "@/shared/hooks/apiHooks";
import { errorHandler } from "@/shared/utils/errorHandler";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

const allTasks: FC = () => {
  const userData = useAppSelector((state) => state.user.user);
  const { data: tasksData, error } = useGetAllTasksQuery(null);
  const isAllowedUser = userData?.permissions.includes("get_all_tasks");

  if (!isAllowedUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography>You don&apos;t have enough access</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {errorHandler(error)}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      {!tasksData && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress size={"120px"} />
        </Box>
      )}

      {tasksData &&
        tasksData.tasks?.map((task) => {
          return <TaskCard key={task.id} taskData={task}></TaskCard>;
        })}
    </Box>
  );
};

export default allTasks;
