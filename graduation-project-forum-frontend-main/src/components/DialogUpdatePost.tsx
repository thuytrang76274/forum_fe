import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

const DialogUpdatePost = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography fontSize="13px">Update post</Typography>
      </DialogTitle>
    </Dialog>
  );
};

export default DialogUpdatePost;
