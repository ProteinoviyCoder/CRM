import { FC, memo, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  ButtonBase,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  AccountCircle,
  FormatIndentIncrease,
  FormatIndentDecrease,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppSelector } from "@/shared/hooks/apiHooks";

type InitialHeaderProps = {
  setIsOpenSidebar: (updater: (prev: boolean) => boolean) => void;
  isOpenSidebar: boolean;
};

const InitialHeader: FC<InitialHeaderProps> = ({
  setIsOpenSidebar,
  isOpenSidebar,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const business = useAppSelector((state) => state.business.business);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <AppBar
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: "0.7s ease",
        transform: show ? "translateY(0%)" : "translateY(-100%)",
      }}
    >
      <Toolbar
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
          maxWidth: "1920px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <IconButton onClick={() => setIsOpenSidebar((prev) => !prev)}>
              {isOpenSidebar ? (
                <FormatIndentDecrease
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                  }}
                />
              ) : (
                <FormatIndentIncrease
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                  }}
                />
              )}
            </IconButton>
          </Box>
        </Box>
        <Typography
          sx={{
            flexGrow: 1,
            textTransform: "uppercase",
            fontWeight: 600,
            textAlign: "center",
            display: { xs: "none", sm: "block" },
          }}
        >
          {business?.businessName || "loading..."}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonBase
            sx={{
              padding: "5px 10px",
              borderRadius: "10px",
              transition: "0.3s ease",
              border: `1px solid ${theme.palette.primary.dark}`,
              ["&: hover"]: {
                backgroundColor: "primary.dark",
              },
            }}
            onClick={() => router.push("/profile")}
          >
            <Typography
              sx={{
                flexGrow: 1,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main
                ),
              }}
            >
              {user?.username}
            </Typography>
            <AccountCircle
              sx={{
                width: "40px",
                height: "40px",
                marginLeft: "10px",
                color: theme.palette.getContrastText(
                  theme.palette.primary.main
                ),
              }}
            ></AccountCircle>
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export const Header = memo(InitialHeader);
