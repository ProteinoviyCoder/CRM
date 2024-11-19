import { Container, Box } from "@mui/material";
import { FC, useEffect } from "react";
import { LoginForm } from "@/features/auth/ui/loginForm";
import { useAppSelector } from "@/shared/hooks/apiHooks";
import { useRouter } from "next/router";

const Login: FC = () => {
  const router = useRouter();

  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData.user) {
      router.replace("/");
    }
  }, [userData]);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;
