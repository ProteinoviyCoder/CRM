import { Box, CircularProgress, Typography } from "@mui/material";
import { UserCard } from "@/features/team/ui/userCard";
import { useAppSelector } from "@/shared/hooks/apiHooks";
import { useGetTeamQuery } from "@/features/team/api/getTeamData";
import { errorHandler } from "@/shared/utils/errorHandler";

const Team = () => {
  const userData = useAppSelector((state) => state.user.user);
  const isAllowedUser = userData?.permissions.includes("get_team");
  const { data: teamData, error } = useGetTeamQuery(null);

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
        <Typography>You don't have enough access</Typography>
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
      {!teamData && (
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

      {teamData &&
        teamData.team?.map((userOfTeam) => {
          return (
            <UserCard
              key={userOfTeam.username}
              userData={userOfTeam}
            ></UserCard>
          );
        })}
    </Box>
  );
};

export default Team;
