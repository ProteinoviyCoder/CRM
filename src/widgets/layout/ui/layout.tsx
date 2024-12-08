import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { FC, memo, ReactNode, useState } from "react";
import { Header } from "@/widgets/header/ui/header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { Main } from "@/widgets/main/ui/main";

type InitialLayoutProps = {
  children?: ReactNode;
};

const InitialLayout: FC<InitialLayoutProps> = ({ children }) => {
  const router = useRouter();

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);

  if (router.pathname === "/login" || router.pathname === "/registration") {
    return children;
  }

  return (
    <Box
      sx={{
        maxWidth: "1920px",
        width: "100%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Header
        setIsOpenSidebar={setIsOpenSidebar}
        isOpenSidebar={isOpenSidebar}
      ></Header>
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      ></Sidebar>
      <Main isOpenSidebar={isOpenSidebar}>{children}</Main>
    </Box>
  );
};

export const Layout = memo(InitialLayout);
