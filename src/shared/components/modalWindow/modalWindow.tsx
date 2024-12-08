import React, { memo, FC, ReactNode } from "react";
import { Modal, Box, Typography, keyframes } from "@mui/material";
import { Close } from "@mui/icons-material";

type InitialModalWindowProps = {
  children: ReactNode;
  isOpenModal: boolean;
  setIsOpenModal: (uprgrade: boolean) => void;
  modalHeaderText?: string;
  footer?: ReactNode;
};

const InitialModalWindow: FC<InitialModalWindowProps> = ({
  children,
  isOpenModal,
  setIsOpenModal,
  modalHeaderText,
  footer,
}) => {
  const animationScaleIn = keyframes`from{transform: scale(0.3)} to{transform:scale(1)}`;

  return (
    <Modal
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={(theme) => ({
          width: "400px",
          maxWidth: "90%",
          minHeight: "200px",
          maxHeight: "90dvh",
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          padding: "10px",
          overflowX: "hidden",
          overflowY: "auto",
          transition: "0.3s ease",
          animation: `${animationScaleIn} 0.2s ease`,
          "&::-webkit-scrollbar": {
            width: "4px",
            backgroundColor: theme.palette.background.paper,
          },
          "&::-webkit-scrollbar-thumb": {
            width: "4px",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "10px",
          },
        })}
      >
        <Box sx={{ display: "flex", marginBottom: "30px" }}>
          <Typography sx={{ flexGrow: 1, textAlign: "center" }} variant="h5">
            {modalHeaderText ? modalHeaderText : ""}
          </Typography>
          <Close
            sx={(theme) => ({
              width: "30px",
              height: "30px",
              cursor: "pointer",
              color: theme.palette.getContrastText(
                theme.palette.background.paper
              ),
            })}
            onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpenModal(false);
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          {children}
        </Box>
        {footer && <Box>{footer}</Box>}
      </Box>
    </Modal>
  );
};

export const ModalWindow = memo(InitialModalWindow);
