import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PostDto } from "../dtos";
import { useAppStore } from "../hooks";
import { IoStarOutline } from "react-icons/io5";
import { useState } from "react";
import { updatePost } from "../axios/post";
import { useNavigate } from "react-router";

const ApprovePostIssue = ({
  id,
  post,
  checked,
  onChecked,
}: {
  id: number;
  post: PostDto;
  checked: boolean;
  onChecked: (index: number) => void;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const handleListAssignee = () => {
    const assigneeLength = post.issue?.assignees?.length;
    if (assigneeLength === undefined || assigneeLength === 0) return "--";
    let result = "";
    for (let i = 0; i < assigneeLength - 1; ++i) {
      result = result.concat(`${post.issue?.assignees[i].name}, `);
    }
    return result.concat(`${post.issue?.assignees[assigneeLength - 1].name}`);
  };
  const [openApprove, setOpenApprove] = useState<boolean>(false);
  const [openRefuse, setOpenRefuse] = useState<boolean>(false);
  const handleOpenApprove = () => setOpenApprove(true);
  const handleCloseApprove = () => setOpenApprove(false);
  const handleOpenRefuse = () => setOpenRefuse(true);
  const handleCloseRefuse = () => setOpenRefuse(false);
  async function handleApprove() {
    const payload = {
      status: "ANALYST",
    };
    try {
      await updatePost(post.id, payload, state.user?.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Box>
      <Box display="flex">
        <Box>
          <Checkbox checked={checked} onClick={() => onChecked(id)} />
        </Box>
        <Box display="flex">
          <Card sx={{ width: "725px" }}>
            <CardHeader
              avatar={<Avatar>{post.createdBy?.charAt(0)}</Avatar>}
              title={post.createdBy}
              subheader={post.createdAt}
            />
            <CardContent sx={{ paddingTop: "0px" }}>
              <Stack spacing="10px">
                <Typography fontWeight="700" variant="body2">
                  {post.title}
                </Typography>
                <Typography variant="body2">
                  <strong>Issue: </strong>
                  {`"${post.issue?.content}"`}
                </Typography>
                <Typography variant="body2">
                  <strong>Description: </strong>
                  {`"${post.description}"`}
                </Typography>
                <Grid2 container>
                  <Grid2 size={11} display="flex" alignItems="center">
                    <Stack direction="row" spacing="10px">
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Customer: </strong>
                          {post.customer?.codeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Version: </strong>
                          {post.issue?.version}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Type: </strong>
                          {post.issue?.type?.codeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Module: </strong>
                          {post.module?.codeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Due date: </strong>
                          {post.issue?.dueDate}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid2>
                  <Grid2 size={12}>
                    <hr />
                  </Grid2>
                </Grid2>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  bgcolor: "#F48023",
                }}
                onClick={handleOpenApprove}
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
                sx={{ bgcolor: "black" }}
                onClick={handleOpenRefuse}
              >
                <Typography
                  fontSize="13px"
                  color="white"
                  sx={{ textTransform: "none" }}
                >
                  Refuse
                </Typography>
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ width: "277px" }}>
            <CardHeader avatar={<IoStarOutline />} title="Details" />
            <CardContent sx={{ paddingTop: "0px" }}>
              <Stack spacing="10px">
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Customer
                  </Typography>
                  <Typography fontSize="13px">
                    {post.issue?.customer?.codeName}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Assignee
                  </Typography>
                  <Typography fontSize="13px">
                    {handleListAssignee()}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Reporter
                  </Typography>
                  <Typography fontSize="13px">{post.createdBy}</Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Type
                  </Typography>
                  <Typography fontSize="13px">
                    {post.issue?.type?.codeName}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Version
                  </Typography>
                  <Typography fontSize="13px">{post.issue?.version}</Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Module
                  </Typography>
                  <Typography fontSize="13px">
                    {post.module?.codeName}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Apply for
                  </Typography>
                  <Typography fontSize="13px">{post.applyFor}</Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Due date
                  </Typography>
                  <Typography fontSize="13px">{post.issue?.dueDate}</Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Is appendix
                  </Typography>
                  <Typography fontSize="13px">
                    {post.issue?.isAppendix ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize="13px" fontWeight="700">
                    Is deal customer
                  </Typography>
                  <Typography fontSize="13px">
                    {post.issue?.isDealCustomer ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Dialog
        open={openApprove}
        onClose={handleCloseApprove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography id="modal-modal-title" fontSize="13px" fontWeight="700">
            Confirm approve
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography id="modal-modal-description" fontSize="13px">
              Do you want to approve this post?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#F48023",
            }}
            onClick={handleApprove}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Yes
            </Typography>
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ bgcolor: "black", ml: "10px" }}
            onClick={handleCloseApprove}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              No
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRefuse}
        fullWidth
        onClose={handleCloseRefuse}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title" fontSize="13px" fontWeight="700">
          Confirm refuse
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography id="modal-modal-description" fontSize="13px">
              Please provide the reason below
            </Typography>
            <TextField required variant="outlined" size="small" fullWidth />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#F48023",
            }}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Send
            </Typography>
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ bgcolor: "black", ml: "10px" }}
            onClick={handleCloseRefuse}
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
    </Box>
  );
};

export default ApprovePostIssue;
