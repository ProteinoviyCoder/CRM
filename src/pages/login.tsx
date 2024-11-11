import { actionSetUser } from "@/features/auth/model/userSlice";
import { useGetAuthMutation } from "@/features/login/api/getAuth";
import { useAppDispatch } from "@/shared/hooks/apiHooks";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, FC, useState, FormEvent } from "react";
import type { User } from "@/features/auth/model/types";

type LoginFormData = {
  email: {
    text: string;
    error: boolean;
    color: "primary" | "error";
    errorMessage: string;
  };
  password: {
    text: string;
    error: boolean;
    color: "primary" | "error";
    errorMessage: string;
  };
};

const Login: FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: {
      text: "",
      error: false,
      color: "primary",
      errorMessage: "",
    },
    password: {
      text: "",
      error: false,
      color: "primary",
      errorMessage: "",
    },
  });
  const [errorLogin, setErrorLogin] = useState<string>("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [getAuth] = useGetAuthMutation();

  const handleKeyDownEmail = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const validationEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(
      /[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑàèìòùâêîôûäëïöüçÇ._@-]/g,
      ""
    );

    setLoginFormData((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        text: value,
        error: false,
        errorMessage: "",
        color: "primary",
      },
    }));
  };

  const handleKeyDownPassword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }

    if (e.key === ">" || e.key === "<") {
      e.preventDefault();

      setLoginFormData((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: true,
          errorMessage: `Invalid symbol ${e.key}`,
          color: "error",
        },
      }));
    }
  };

  const validationPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setLoginFormData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        text: value,
        error: false,
        errorMessage: "",
        color: "primary",
      },
    }));
  };

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await getAuth({
      email: loginFormData.email.text,
      password: loginFormData.password.text,
    });

    if (response.error) {
      if ("data" in response.error) {
        setErrorLogin(
          (response.error.data as { message?: string })?.message ||
            "Unknown error"
        );
      }

      return;
    }

    const user: User = {
      id: response.data!.user!.id!,
      username: response.data!.user!.username!,
      email: response.data!.user!.email!,
      permissions: response.data!.user!.permissions!,
      role: response.data!.user!.role!,
    };

    dispatch(actionSetUser(user));

    router.replace("/");
    console.log(response);
  };

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
        <Box
          onSubmit={handleSubmitLogin}
          component="form"
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: "25px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            border: `1px solid black`,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" align="center" sx={{ marginBottom: "10px" }}>
            Login
          </Typography>
          <TextField
            value={loginFormData.email.text}
            onChange={validationEmail}
            required
            type="email"
            label={"email"}
            fullWidth
            onKeyDown={handleKeyDownEmail}
            color={loginFormData.email.color}
            helperText={
              loginFormData.email.error && loginFormData.email.errorMessage
            }
            FormHelperTextProps={{
              sx: { color: "error.main" },
            }}
          />
          <TextField
            value={loginFormData.password.text}
            onChange={validationPassword}
            onKeyDown={handleKeyDownPassword}
            required
            type="password"
            label={"password"}
            fullWidth
            color={loginFormData.password.color}
            helperText={
              loginFormData.password.error &&
              loginFormData.password.errorMessage
            }
            FormHelperTextProps={{
              sx: { color: "error.main" },
            }}
          />
          {errorLogin && (
            <Typography
              variant="body1"
              align="center"
              sx={{ marginBottom: "10px" }}
              color="error"
            >
              {errorLogin}
            </Typography>
          )}

          <Button
            variant="contained"
            disabled={
              loginFormData.email.text === "" ||
              loginFormData.password.text === ""
                ? true
                : false
            }
            type="submit"
          >
            Go
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
