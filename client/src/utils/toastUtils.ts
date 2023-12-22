// This file contains the functions used to open and close the toast notifications
export const handleClose = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  event?: React.SyntheticEvent | Event,
  reason?: string
) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};
