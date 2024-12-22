import {
  Backdrop,
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
import { useLocation, useNavigate } from "react-router";

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>("");
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
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
      navigate(0);
    } catch (e) {
      console.log(e.response.data.data);
      setErrorText(e.response.data.data.message);
    }
  };
  const handleClose = () => {
    setOpenAddComment(false);
    setComment("");
    setErrorText(undefined);
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
            helperText={errorText}
            error={errorText === undefined ? false : true}
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
            Approve
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
    </Dialog>
  );
};

export default DialogAddComment;
