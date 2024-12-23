import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { pinComment } from "../axios/comment";
import { useAppStore } from "../hooks";
import { useNavigate } from "react-router";
import DialogError from "./DialogError";

const DialogPinComment = ({
  openPinComment,
  setOpenPinComment,
  currentCommentId,
}: {
  openPinComment: boolean;
  setOpenPinComment: (open: boolean) => void;
  currentCommentId: number;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  async function handlePinSuggestion() {
    try {
      console.log(currentCommentId);
      setLoading(true);
      await pinComment(currentCommentId, state.user?.token);
      setLoading(false);
      setOpenPinComment(false);
      navigate(0);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrorMessage(e.response.data.data.message);
      setOpenError(true);
    }
  }
  return (
    <>
      <Dialog open={openPinComment}>
        <DialogTitle>
          <Typography fontSize="13px" fontWeight="700">
            Pin Suggestions
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography fontSize="13px">
            Are you sure want to pin this suggestion as the solution to this
            issue?
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
            onClick={handlePinSuggestion}
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
            onClick={() => setOpenPinComment(false)}
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
        <DialogError
          openError={openError}
          setOpenError={setOpenError}
          errorMessage={errorMessage}
        />
      </Dialog>
    </>
  );
};

export default DialogPinComment;
