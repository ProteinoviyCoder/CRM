import { useAppDispatch, useAppSelector } from "@/shared/hooks/apiHooks";
import { Box, CircularProgress } from "@mui/material";
import { FC, memo, ReactNode, useEffect } from "react";
import { useLazyGetAuthQuery } from "../api/getAuth";
import {
  actionSetUser,
  actionChangefirstTry,
} from "../../../shared/storeSlices/userSlice";
import { useRouter } from "next/router";
import { actionSetBusiness } from "@/shared/storeSlices/businessSlice";

interface InitialAuthProps {
  children?: ReactNode;
}

const InitialAuth: FC<InitialAuthProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuth, isFirstTry } = useAppSelector((state) => state.user);
  const [getAuth] = useLazyGetAuthQuery();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isAuth) {
      if (isFirstTry) {
        const updateUser = async () => {
          const response = await getAuth(null);

          if (response.isSuccess) {
            dispatch(actionSetUser(response.data!.userForResponse!));
            dispatch(
              actionSetBusiness({
                businessName: response.data!.businessName!,
                businessTasks: response.data!.tasks!,
              })
            );
          }

          if (response.isError) {
            dispatch(actionChangefirstTry(false));
          }

          if (
            response.isError &&
            router.pathname !== "/login" &&
            router.pathname !== "/registration"
          ) {
            router.replace("/login");
          }
        };

        updateUser();
      } else {
        if (
          router.pathname === "/login" ||
          router.pathname === "/registration"
        ) {
          return;
        }
        router.replace("/login");
      }
    }
  }, [user, isAuth, isFirstTry]);

  if (
    !isAuth &&
    router.pathname !== "/login" &&
    router.pathname !== "/registration"
  ) {
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
