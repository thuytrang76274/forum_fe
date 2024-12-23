import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const DialogError = ({
  openError,
  setOpenError,
  errorMessage,
}: {
  openError: boolean;
  setOpenError: (open: boolean) => void;
  errorMessage: string | null;
}) => {
  return (
    <Dialog open={openError} onClose={() => setOpenError(false)}>
      <DialogTitle>
        <Typography fontSize="13px" fontWeight="700">
          Error
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography fontSize="13px">{errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          sx={{ bgcolor: "black", textTransform: "none" }}
          onClick={() => setOpenError(false)}
        >
          <Typography fontSize="13px" color="white">
            I understand
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogError;
