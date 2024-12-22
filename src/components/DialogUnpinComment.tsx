import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { unpinComment } from "../axios/comment";
import { useAppStore } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DialogUnpinComment = ({
  openUnpinComment,
  setOpenUnpinComment,
  currentCommentId,
}: {
  openUnpinComment: boolean;
  setOpenUnpinComment: (open: boolean) => void;
  currentCommentId: number;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  async function handleUnpinSuggestion() {
    try {
      setLoading(true);
      await unpinComment(currentCommentId, state.user?.token);
      setLoading(false);
      setOpenUnpinComment(false);
      navigate(0);
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.response.data.data.message);
      setOpenError(false);
    }
  }
  return (
    <>
      <Dialog open={openUnpinComment}>
        <DialogTitle>
          <Typography fontSize="13px">Pin Suggestions</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography fontSize="13px">
            Do you want to unpin this suggestion?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            disabled={loading === true}
            variant="contained"
            sx={{
              bgcolor: "#F48023",
            }}
            startIcon={loading === true && <CircularProgress size={"13px"} />}
            onClick={handleUnpinSuggestion}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Accept
            </Typography>
          </Button>
          <Button
            size="small"
            onClick={() => setOpenUnpinComment(false)}
            sx={{ bgcolor: "black" }}
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
      <Dialog open={openError}>
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
            variant="contained"
            size="small"
            sx={{
              bgcolor: "black",
            }}
            onClick={() => setOpenError(false)}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Accept
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogUnpinComment;
