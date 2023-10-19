export const handleClose = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  event?: React.SyntheticEvent | Event,
  reason?: string,
) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
