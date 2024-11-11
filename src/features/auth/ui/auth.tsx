import { useAppDispatch, useAppSelector } from "@/shared/hooks/apiHooks";
import { Box, CircularProgress } from "@mui/material";
import { FC, memo, ReactNode, useEffect, useState } from "react";
import { useLazyGetUserQuery } from "../api/getUser";
import { actionSetUser, actionChangefirstTry } from "../model/userSlice";
import { useRouter } from "next/router";

interface AuthProps {
  children?: ReactNode;
}

const InitialAuth: FC<AuthProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuth, isFirstTry } = useAppSelector((state) => state.user);
  const [getUser] = useLazyGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isAuth) {
      if (isFirstTry) {
        const updateUser = async () => {
          const response = await getUser(null);

          response.isSuccess &&
            dispatch(actionSetUser(response.data.userForResponse));

          response.isError && dispatch(actionChangefirstTry(false));

          if (response.isError && router.pathname !== "/login") {
            router.replace("/login");
          }
        };

        updateUser();
      } else {
        router.replace("/login");
      }
    }
  }, [user, isAuth]);

  if (!isAuth && router.pathname !== "/login") {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={"120px"} />
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export const Auth = memo(InitialAuth);
