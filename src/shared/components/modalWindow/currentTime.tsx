import { Box, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";

type InitialCurrentTimeProps = {
  variantText: "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const InitialCurrentTime: FC<InitialCurrentTimeProps> = ({ variantText }) => {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    let timerId = setInterval(() => {
      const now = new Date();
      const hours =
        now.getHours().toString().length > 1
          ? now.getHours().toString()
          : "0" + now.getHours().toString();
      const minutes =
        now.getMinutes().toString().length > 1
          ? now.getMinutes().toString()
          : "0" + now.getMinutes().toString();
      const seconds =
        now.getSeconds().toString().length > 1
          ? now.getSeconds().toString()
          : "0" + now.getSeconds().toString();
      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Box>
      <Typography variant={variantText}>{time}</Typography>
    </Box>
  );
};

export const CurrentTime = memo(InitialCurrentTime);
