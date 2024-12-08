import { actionClearBusiness } from "@/shared/storeSlices/businessSlice";
import { actionLogoutUser } from "@/shared/storeSlices/userSlice";
import { ExitToAppSharp, Groups3, Home, Assignment } from "@mui/icons-material";
import { Drawer, List } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { useLazyGetLogoutQuery } from "../api/getLogout";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/apiHooks";
import { useRouter } from "next/router";
import { SidebarItem } from "./sidebarItem";
import { DataItemForSidebar } from "../model/types";

type InitialSidebarProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: (updater: boolean) => void;
};

const InitialSidebar: FC<InitialSidebarProps> = ({
  isOpenSidebar,
  setIsOpenSidebar,
}) => {
  const dispatch = useAppDispatch();
  const [getLogout] = useLazyGetLogoutQuery();
  const [show, setShow] = useState<boolean>(false);
  const route = useRouter();
  const dataUser = useAppSelector((state) => state.user.user);

  const logoutFromSystem = async (): Promise<void> => {
    await getLogout(null);

    dispatch(actionClearBusiness());
    dispatch(actionLogoutUser());

    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
    }

    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const dataForSidebar: DataItemForSidebar<void | boolean>[] = [
    {
      icon: Home,
      event: () => route.push("/"),
      text: "Home",
      isAccess: true,
    },
    {
      icon: Groups3,
      event: () => route.push("/team"),
      text: "Team",
      isAccess: dataUser?.permissions.includes("get_team") ? true : false,
    },
    {
      icon: Assignment,
      event: () => route.push("/allTasks"),
      text: "All tasks",
      isAccess: dataUser?.permissions.includes("get_all_tasks") ? true : false,
    },
    {
      icon: ExitToAppSharp,
      event: logoutFromSystem,
      text: "Log out",
      isAccess: true,
    },
  ];

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Drawer
      onClick={() => {
        setIsOpenSidebar(!isOpenSidebar);
      }}
      PaperProps={{
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          e.preventDefault();
        },
      }}
      variant="permanent"
      sx={{
        width: {
          xs: isOpenSidebar ? "100%" : 70,
          md: isOpenSidebar ? 240 : 70,
        },
        backgroundColor: "rgba(1,1,1,0.5)",
        flexShrink: 0,
        height: "100dvh",
        position: "fixed",
        top: 0,
        transition: "0.7s ease",
        transform: show ? "translateX(0%)" : "translateX(-100%)",
        overflowX: "hidden",
        zIndex: 1,
        "& .MuiDrawer-paper": {
          width: isOpenSidebar ? 240 : 70,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          transition: "0.7s ease",
          transform: show ? "translateX(0%)" : "translateX(-100%)",
          overflowX: "hidden",
        },
      }}
    >
      <List
        sx={(theme) => ({
          marginTop: "70px",
          height: "100%",
          display: "flex",

          flexDirection: "column",
          gap: "5px",
          color: theme.palette.getContrastText(theme.palette.primary.main),
          whiteSpace: "nowrap",
          "& .MuiListItem-root": {
            padding: "5px 11px",
          },
        })}
      >
        {dataForSidebar.map((itemSidebar) => {
          if (!itemSidebar.isAccess) {
            return;
          }
          return (
            <SidebarItem
              key={itemSidebar.text}
              itemSidebar={itemSidebar}
              isOpenSidebar={isOpenSidebar}
            ></SidebarItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export const Sidebar = memo(InitialSidebar);
