import { useLazyGetTeamQuery } from "@/features/team/api/teamApi";
import { useAppSelector } from "@/shared/hooks/apiHooks";
import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { User } from "@/shared/storeSlices/userSlice";
import type { BusinessTask } from "@/shared/storeSlices/businessSlice";
import { useRouter } from "next/router";
import { useLazyGetAllTasksQuery } from "@/features/tasks/api/tasksApi";
import { CurrentTime } from "@/shared/components/modalWindow/currentTime";

export default function Home() {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user.user);

  const [getTeam] = useLazyGetTeamQuery();
  const [getTasks] = useLazyGetAllTasksQuery();

  const [dataTeam, setDataTeam] = useState<User[] | []>([]);
  const [dataTasks, setDataTasks] = useState<BusinessTask[] | []>([]);

  useEffect(() => {
    if (userData?.permissions.includes("get_team")) {
      const getTeamAsync = async () => {
        const response = await getTeam(null);
        response.data?.team && setDataTeam(response.data.team);
      };
      getTeamAsync();
    }

    if (userData?.permissions.includes("get_all_tasks")) {
      const getTasksAsync = async () => {
        const response = await getTasks(null);
        response.data?.tasks && setDataTasks(response.data.tasks);
      };
      getTasksAsync();
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "25px",
        }}
      >
        <CurrentTime variantText="h2"></CurrentTime>
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          "& .MuiCard-root": {
            boxShadow: `0 0 4px 1px ${theme.palette.primary.dark}`,
            width: "100%",
            maxWidth: "300px",
            cursor: "pointer",
            minHeight: "70px",
            "&: hover": {
              boxShadow: `0 0 5px 3px ${theme.palette.primary.dark}`,
            },
          },
        })}
      >
        {userData?.permissions.includes("get_team") && dataTeam && (
          <Card variant="outlined" onClick={() => router.push("./team")}>
            <Typography sx={{ textAlign: "center", margin: "5px 0" }}>
              My team
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Number of people: {dataTeam.length ? dataTeam.length : "..."}
            </Typography>
          </Card>
        )}

        {userData?.permissions.includes("get_all_tasks") && dataTasks && (
          <Card variant="outlined" onClick={() => router.push("./allTasks")}>
            <Typography sx={{ textAlign: "center", margin: "5px 0" }}>
              All tasks
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Number of tasks: {dataTasks.length ? dataTasks.length : "..."}
            </Typography>
          </Card>
        )}
      </Box>
    </Box>
  );
}
