import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { addCommentToPost } from "../axios/comment";
import { useAppStore } from "../hooks";
import { useNavigate } from "react-router";
import DialogError from "./DialogError";

const DialogAddComment = ({
  currentPostId,
  openAddComment,
  setOpenAddComment,
}: {
  currentPostId: number;
  openAddComment: boolean;
  setOpenAddComment: (open: boolean) => void;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleAddComment = async () => {
    try {
      await addCommentToPost(
        {
          content: comment,
          post: {
            id: currentPostId,
          },
        },
        state.user?.token
      );
      setOpenAddComment(false);
      navigate(0);
    } catch (e) {
      console.log(e.response.data.data);
      setOpenError(true);
      setErrorMessage(e.response.data.data.message);
    }
  };
  const handleClose = () => {
    setOpenAddComment(false);
    setComment("");
  };
  return (
    <Dialog open={openAddComment} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography>Add comment</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: "#F48023",
          }}
          onClick={handleAddComment}
        >
          <Typography
            fontSize="13px"
            color="white"
            sx={{ textTransform: "none" }}
          >
            Add
          </Typography>
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ bgcolor: "black", ml: "10px" }}
          onClick={handleClose}
        >
          <Typography
            fontSize="13px"
            color="white"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Typography>
        </Button>
      </DialogActions>
      <DialogError
        openError={openError}
        setOpenError={setOpenError}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

export default DialogAddComment;
