import { useAppSelector } from "@/shared/hooks/apiHooks";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, memo, ReactNode } from "react";

type InitialLayoutProps = {
  children?: ReactNode;
};

const InitialLayout: FC<InitialLayoutProps> = ({ children }) => {
  const router = useRouter();
  const business = useAppSelector((state) => state.business.business);
  console.log(business);

  if (router.pathname === "/login" || router.pathname === "/registration") {
    return children;
  }

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography>{business?.businessName || "loading..."}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "80px" }}>{children}</Box>
    </Box>
  );
};

export const Layout = memo(InitialLayout);
