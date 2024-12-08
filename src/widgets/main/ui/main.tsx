import { Paper } from "@mui/material";
import { FC, memo, ReactNode, useEffect, useState } from "react";

type InitialMainProps = {
  children: ReactNode;
  isOpenSidebar: boolean;
};

const InitialMain: FC<InitialMainProps> = ({ children, isOpenSidebar }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Paper
      sx={(theme) => ({
        marginTop: "80px",
        marginLeft: {
          xs: isOpenSidebar ? "80px" : "90px",
          md: isOpenSidebar ? "260px" : "90px",
        },
        marginRight: "20px",
        padding: "20px",
        height: "calc(100dvh - 100px)",
        transition: "0.7s ease",
        transform: show ? "scale(1)" : "scale(0.5)",
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          backgroundColor: theme.palette.background.paper,
          width: "4px",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.primary.main,
          width: "4px",
          borderRadius: "10px",
        },
      })}
    >
      {children}
    </Paper>
  );
};

export const Main = memo(InitialMain);
