import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import dayjs from "dayjs";
import { BsFillPinFill, BsPinAngleFill, BsHandThumbsUp } from "react-icons/bs";
import DialogPinComment from "./DialogPinComment";
import DialogUnpinComment from "./DialogUnpinComment";
import { CommentDto } from "../dtos";
import { useState } from "react";

const Comment = ({ comment }: { comment: CommentDto }) => {
  const [openUnpinComment, setOpenUnpinComment] = useState<boolean>(false);
  const [openPinComment, setOpenPinComment] = useState<boolean>(false);
  return (
    <Card key={comment.id} sx={{ marginTop: "16px" }}>
      <CardHeader
        avatar={<Avatar>{comment.createdBy[0]}</Avatar>}
        action={
          comment.isSolution ? (
            <IconButton onClick={() => setOpenUnpinComment(true)}>
              <BsFillPinFill />
            </IconButton>
          ) : (
            <IconButton onClick={() => setOpenPinComment(true)}>
              <BsPinAngleFill />
            </IconButton>
          )
        }
        title={comment.createdBy}
        subheader={dayjs(comment.createdAt).format("DD/MM/YYYY")}
      />
      <CardContent>
        <Typography fontSize="13px">{comment.content}</Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small">
          <BsHandThumbsUp />
        </IconButton>
        <Typography fontSize="13px">{comment.vote}</Typography>
      </CardActions>
      <DialogUnpinComment
        currentCommentId={comment.id}
        setOpenUnpinComment={setOpenUnpinComment}
        openUnpinComment={openUnpinComment}
      />
      <DialogPinComment
        currentCommentId={comment.id}
        setOpenPinComment={setOpenPinComment}
        openPinComment={openPinComment}
      />
    </Card>
  );
};

export default Comment;
