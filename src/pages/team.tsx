import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { UserCard } from "@/features/team/ui/userCard";
import { useAppSelector } from "@/shared/hooks/apiHooks";
import { useGetTeamQuery } from "@/features/team/api/teamApi";
import { errorHandler } from "@/shared/utils/errorHandler";
import { ModalWindow } from "@/shared/components/modalWindow/modalWindow";
import { useState } from "react";
import { AddWorkerForm } from "@/features/team/ui/addWorkerForm";

const Team = () => {
  const userData = useAppSelector((state) => state.user.user);
  const isAllowedUser = userData?.permissions.includes("get_team");
  const { data: teamData, error } = useGetTeamQuery(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            md: "flex-end",
          },
        }}
      >
        {userData?.permissions.includes("create_worker") && (
          <Button variant="contained" onClick={() => setIsOpenModal(true)}>
            Add team member
          </Button>
        )}
      </Box>
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

      <ModalWindow
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        modalHeaderText="Add new worker"
      >
        <AddWorkerForm></AddWorkerForm>
      </ModalWindow>
    </Box>
  );
};

export default Team;
