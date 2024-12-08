import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  alpha,
  Box,
  Button,
  Checkbox,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, memo, useState } from "react";
import { UserSettingsData } from "../model/types";
import { errorHandler } from "@/shared/utils/errorHandler";
import { useAddNewWorkerMutation } from "../api/teamApi";

const InitialAddWorkerForm = () => {
  const [addNewWorker, { error: errorAddWorker }] = useAddNewWorkerMutation();
  const [userSettings, setUserSettings] = useState<UserSettingsData>({
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
    repeatPassword: {
      text: "",
      error: false,
      color: "primary",
      errorMessage: "",
      isVisibleText: false,
    },
    role: "employee",
  });
  const [permissionsSettings, setPermissionsSettings] = useState([
    { text: "Viewing the tasks", value: "get_all_tasks", checked: false },
    { text: "Viewing the command", value: "get_team", checked: false },
    { text: "Add new team member", value: "create_worker", checked: false },
  ]);

  const handleKeyDownUsername = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
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

      setUserSettings((prev) => ({
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

  const validationUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setUserSettings((prev) => ({
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

  const handleKeyDownPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

      setUserSettings((prev) => ({
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

  const validationPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUserSettings((prev) => ({
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

  const handleKeyDownRepeatPassword = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
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

      setUserSettings((prev) => ({
        ...prev,
        repeatPassword: {
          ...prev.repeatPassword,
          error: true,
          errorMessage: `Invalid symbol: ${e.key}`,
          color: "error",
        },
      }));
    }
  };

  const validationRepeatPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setUserSettings((prev) => ({
      ...prev,
      repeatPassword: {
        ...prev.repeatPassword,
        text: value,
        error: false,
        errorMessage: "",
        color: "primary",
      },
    }));
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userSettings.password.text !== userSettings.repeatPassword.text) {
      setUserSettings((prev) => ({
        ...prev,
        repeatPassword: {
          ...prev.repeatPassword,
          color: "error",
          error: true,
          errorMessage: "The password was repeated incorrectly",
        },
      }));
      return;
    }

    if (userSettings.password.text.length < 15) {
      setUserSettings((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          color: "error",
          error: true,
          errorMessage:
            "The password is short, the minimum length is 15 characters",
        },
      }));
      return;
    }

    addNewWorker({
      username: userSettings.username.text,
      password: userSettings.password.text,
      role: userSettings.role,
      permissions: permissionsSettings
        .filter((permission) => {
          return permission.checked === true;
        })
        .map((permission) => permission.value),
    });
  };

  return (
    <Box
      onSubmit={(e) => handleSubmitForm(e)}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "17px",
        width: "100%",
      }}
    >
      <TextField
        value={userSettings.username.text}
        onChange={validationUsername}
        required
        type="text"
        label={"username"}
        fullWidth
        onKeyDown={handleKeyDownUsername}
        color={userSettings.username.color}
        helperText={
          userSettings.username.error && userSettings.username.errorMessage
        }
        FormHelperTextProps={{
          sx: { color: "error.main" },
        }}
        sx={{ backgroundColor: "background.paper" }}
      />

      <TextField
        sx={(theme) => ({
          backgroundColor: "background.paper",
          "& .MuiOutlinedInput-notchedOutline": {
            border: userSettings.password.error
              ? `2px solid ${theme.palette.error.main}`
              : "",
            borderRadius: "5px",
          },
          "&: hover .MuiOutlinedInput-notchedOutline": {
            border: userSettings.password.error
              ? `2px solid ${theme.palette.error.main}`
              : "",
            borderRadius: "5px",
          },
        })}
        value={userSettings.password.text}
        onChange={validationPassword}
        onKeyDown={handleKeyDownPassword}
        required
        type={userSettings.password.isVisibleText ? "text" : "password"}
        label={"password"}
        fullWidth
        color={userSettings.password.color}
        helperText={
          userSettings.password.error && userSettings.password.errorMessage
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
                setUserSettings((prev) => ({
                  ...prev,
                  password: {
                    ...prev.password,
                    isVisibleText: !prev.password.isVisibleText,
                  },
                }));
              }}
            >
              {userSettings.password.isVisibleText ? (
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
      />

      <TextField
        sx={(theme) => ({
          backgroundColor: "background.paper",
          "& .MuiOutlinedInput-notchedOutline": {
            border: userSettings.repeatPassword.error
              ? `2px solid ${theme.palette.error.main}`
              : "",
            borderRadius: "5px",
          },
          "&: hover .MuiOutlinedInput-notchedOutline": {
            border: userSettings.repeatPassword.error
              ? `2px solid ${theme.palette.error.main}`
              : "",
            borderRadius: "5px",
          },
        })}
        value={userSettings.repeatPassword.text}
        onChange={validationRepeatPassword}
        onKeyDown={handleKeyDownRepeatPassword}
        required
        type={userSettings.repeatPassword.isVisibleText ? "text" : "password"}
        label={"password again"}
        fullWidth
        color={userSettings.repeatPassword.color}
        helperText={
          userSettings.repeatPassword.error &&
          userSettings.repeatPassword.errorMessage
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
                setUserSettings((prev) => ({
                  ...prev,
                  repeatPassword: {
                    ...prev.repeatPassword,
                    isVisibleText: !prev.repeatPassword.isVisibleText,
                  },
                }));
              }}
            >
              {userSettings.repeatPassword.isVisibleText ? (
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
      />

      <TextField
        label="Choose a role"
        fullWidth
        select
        value={userSettings.role}
        onChange={(e) =>
          setUserSettings((prev) => ({ ...prev, role: e.target.value }))
        }
      >
        <MenuItem value="employee">Employee</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <List
        sx={{
          padding: 0,
          margin: 0,
          "& .MuiListItem-root": {
            padding: "13px 0px 0px 10px",
            margin: 0,
            gap: "7px",
          },
          "& .MuiCheckbox-root": {
            padding: 0,
            margin: 0,
          },
        }}
      >
        <Typography variant="body1">Permissions:</Typography>
        {permissionsSettings.map((permission) => {
          return (
            <ListItem key={permission.value}>
              <Checkbox
                value={permission.value}
                onChange={() =>
                  setPermissionsSettings((prev) =>
                    prev.map((item) =>
                      item.value === permission.value
                        ? { ...item, checked: !item.checked }
                        : item
                    )
                  )
                }
                checked={permission.checked}
                size="medium"
              />
              <Typography variant="body2">{permission.text}</Typography>
            </ListItem>
          );
        })}
      </List>

      {errorAddWorker && (
        <Alert
          severity="error"
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.error.main, 0.4),
            color: theme.palette.getContrastText(theme.palette.error.main),
          })}
        >
          {errorHandler(errorAddWorker)}
        </Alert>
      )}
      <Button type="submit" variant="contained">
        Create worker
      </Button>
    </Box>
  );
};

export const AddWorkerForm = memo(InitialAddWorkerForm);
