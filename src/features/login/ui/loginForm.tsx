import { actionSetUser } from "@/shared/storeSlices/userSlice";
import { useGetLoginMutation } from "@/features/login/api/getLogin";
import { useAppDispatch } from "@/shared/hooks/apiHooks";
import { alpha } from "@mui/material";
import {
  FC,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  memo,
  useState,
} from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import { LoginFormData } from "../model/types";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { User } from "@/shared/storeSlices/userSlice";
import { actionSetBusiness } from "@/shared/storeSlices/businessSlice";
import type { Business } from "@/shared/storeSlices/businessSlice";

const InitialLoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [getLogin] = useGetLoginMutation();

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    username: {
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
      isVisibleText: false,
    },
  });
  const [errorLogin, setErrorLogin] = useState<string>("");

  const handleKeyDownUsername = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === " ") {
      e.preventDefault();
    }

    if (
      e.key === ">" ||
      e.key === "<" ||
      e.key === "?" ||
      e.key === "/" ||
      e.key === "\\"
    ) {
      e.preventDefault();

      setLoginFormData((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          error: true,
          errorMessage: `Invalid symbol: ${e.key}`,
          color: "error",
        },
      }));
    }
  };

  const validationUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setLoginFormData((prev) => ({
      ...prev,
      username: {
        ...prev.username,
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
          errorMessage: `Invalid symbol: ${e.key}`,
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

    const response = await getLogin({
      username: loginFormData.username.text,
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
      id: response.data!.userForResponse!.id!,
      username: response.data!.userForResponse!.username!,
      permissions: response.data!.userForResponse!.permissions!,
      role: response.data!.userForResponse!.role!,
      themeSetting: response.data!.userForResponse!.themeSetting!,
    };

    const business: Business = {
      businessName: response.data!.businessName!,
      businessTasks: null,
    };

    dispatch(actionSetUser(user));
    dispatch(actionSetBusiness(business));

    router.replace("/");
  };

  return (
    <Box
      onSubmit={handleSubmitLogin}
      component="form"
      sx={(theme) => ({
        width: "100%",
        maxWidth: "400px",
        padding: "25px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: `1px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px",
        backgroundColor: "background.paper",
      })}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
        Authorization
      </Typography>
      <TextField
        value={loginFormData.username.text}
        onChange={validationUsername}
        required
        type="text"
        label={"username"}
        fullWidth
        onKeyDown={handleKeyDownUsername}
        color={loginFormData.username.color}
        helperText={
          loginFormData.username.error && loginFormData.username.errorMessage
        }
        FormHelperTextProps={{
          sx: { color: "error.main" },
        }}
        sx={{ backgroundColor: "background.paper" }}
      />
      <TextField
        value={loginFormData.password.text}
        onChange={validationPassword}
        onKeyDown={handleKeyDownPassword}
        required
        type={loginFormData.password.isVisibleText ? "text" : "password"}
        label={"password"}
        fullWidth
        color={loginFormData.password.color}
        helperText={
          loginFormData.password.error && loginFormData.password.errorMessage
        }
        FormHelperTextProps={{
          sx: {
            color: "error.main",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setLoginFormData((prev) => ({
                  ...prev,
                  password: {
                    ...prev.password,
                    isVisibleText: !prev.password.isVisibleText,
                  },
                }));
              }}
            >
              {loginFormData.password.isVisibleText ? (
                <Visibility
                  sx={(theme) => ({
                    color: theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                  })}
                ></Visibility>
              ) : (
                <VisibilityOff
                  sx={(theme) => ({
                    color: theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                  })}
                ></VisibilityOff>
              )}
            </InputAdornment>
          ),
        }}
        sx={{ backgroundColor: "background.paper" }}
      />
      {errorLogin && (
        <Alert
          severity="error"
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.error.main, 0.4),
          })}
        >
          {errorLogin}
        </Alert>
      )}

      <Button
        variant="contained"
        disabled={
          loginFormData.username.text === "" ||
          loginFormData.password.text === ""
            ? true
            : false
        }
        type="submit"
        sx={{
          backgroundColor: "primary.main",
          fontWeight: "600",
          padding: "10px",
        }}
      >
        Log in
      </Button>

      {/* <Button
        variant="outlined"
        sx={(theme) => ({
          marginTop: "35px",
          fontWeight: "400",
          color: theme.palette.getContrastText(theme.palette.background.paper),
          borderColor: "secondary.main",
          ":hover": {
            backgroundColor: "secondary.main",
            opacity: "0.95",
            color: theme.palette.getContrastText(theme.palette.secondary.main),
          },
        })}
        onClick={() => router.replace("/registration")}
      >
        Registration new business
      </Button> */}
    </Box>
  );
};

export const LoginForm = memo(InitialLoginForm);
