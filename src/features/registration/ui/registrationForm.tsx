import { alpha } from "@mui/material";
import { KeyboardEvent, ChangeEvent, FC, memo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { RegistrationFormData } from "../model/types";

const InitialRegistrationForm: FC = () => {
  const router = useRouter();

  const [registrationFormData, setRegistrationFormData] =
    useState<RegistrationFormData>({
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

      setRegistrationFormData((prev) => ({
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

    setRegistrationFormData((prev) => ({
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

      setRegistrationFormData((prev) => ({
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
    setRegistrationFormData((prev) => ({
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

  return (
    <Box
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
        Registration of a new business
      </Typography>
      <TextField
        value={registrationFormData.username.text}
        onChange={validationUsername}
        required
        type="text"
        label={"username"}
        fullWidth
        onKeyDown={handleKeyDownUsername}
        helperText={
          registrationFormData.username.error &&
          registrationFormData.username.errorMessage
        }
        FormHelperTextProps={{
          sx: { color: "error.dark" },
        }}
        color={registrationFormData.username.color}
        sx={{
          backgroundColor: "background.paper",
        }}
      />
      <TextField
        value={registrationFormData.password.text}
        onChange={validationPassword}
        onKeyDown={handleKeyDownPassword}
        required
        type={registrationFormData.password.isVisibleText ? "text" : "password"}
        label={"password"}
        fullWidth
        color={registrationFormData.password.color}
        helperText={
          registrationFormData.password.error &&
          registrationFormData.password.errorMessage
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
                setRegistrationFormData((prev) => ({
                  ...prev,
                  password: {
                    ...prev.password,
                    isVisibleText: !prev.password.isVisibleText,
                  },
                }));
              }}
            >
              {registrationFormData.password.isVisibleText ? (
                <Visibility></Visibility>
              ) : (
                <VisibilityOff></VisibilityOff>
              )}
            </InputAdornment>
          ),
        }}
        sx={{ backgroundColor: "background.paper" }}
      />

      <Button
        variant="contained"
        disabled={
          registrationFormData.username.text === "" ||
          registrationFormData.password.text === ""
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
        Registration
      </Button>

      <Button
        variant="outlined"
        sx={(theme) => ({
          marginTop: "35px",
          fontWeight: "400",
          color: theme.palette.getContrastText(theme.palette.secondary.main),
          borderColor: "secondary.main",
          ":hover": {
            backgroundColor: "secondary.main",
            opacity: "0.95",
            color: theme.palette.getContrastText(theme.palette.secondary.main),
          },
        })}
        onClick={() => router.replace("/login")}
      >
        Log in
      </Button>
    </Box>
  );
};

export const RegistrationForm = memo(InitialRegistrationForm);
