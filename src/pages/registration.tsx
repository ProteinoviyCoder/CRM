import { Container, Box } from "@mui/material";
import { RegistrationForm } from "@/features/registration/ui/registrationForm";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/shared/hooks/apiHooks";

const RegisterPage: FC = () => {
  const router = useRouter();

  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData.user) {
      router.replace("/");
    }
  }, [userData]);

  return (
    <Container
      sx={{
        minWidth: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
        }}
      >
        <RegistrationForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
