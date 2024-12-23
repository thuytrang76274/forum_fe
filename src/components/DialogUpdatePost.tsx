import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PostDto, SystemCodeDetailDto } from "../dtos";
import { useAppStore } from "../hooks";
import { getSinglePost, updatePost } from "../axios/post";
import { IoStarOutline } from "react-icons/io5";
import { getModule } from "../axios/systemcode";
import { useLocation, useNavigate } from "react-router";
import DialogError from "./DialogError";

const optionsApplyFor = [
  {
    id: 1,
    name: "ALL_SITE",
  },
  {
    id: 2,
    name: "CUSTOMIZED",
  },
];

const optionsPostStatus = [
  "WAITING_APPROVE",
  "ANALYST",
  "DONE",
  "PENDING",
  "CLOSE",
];

const DialogUpdatePost = ({
  currentPostId,
  openUpdatePost,
  setOpenUpdatePost,
}: {
  currentPostId: number;
  openUpdatePost: boolean;
  setOpenUpdatePost: (open: boolean) => void;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDto | null | undefined>(undefined);
  const [options, setOptions] = useState<{
    modules: SystemCodeDetailDto[];
  }>({
    modules: [],
  });
  const [change, setChange] = useState<{
    title: {
      value?: string;
      isChange: boolean;
    };
    description: {
      value?: string;
      isChange: boolean;
    };
    applyFor: {
      value?: string;
      isChange: boolean;
    };
    module: {
      value?: string;
      isChange: boolean;
    };
    status: {
      value?: string;
      isChange: boolean;
    };
  }>({
    title: {
      value: "",
      isChange: false,
    },
    description: {
      value: "",
      isChange: false,
    },
    applyFor: {
      value: "",
      isChange: false,
    },
    module: {
      value: "",
      isChange: false,
    },
    status: {
      value: "",
      isChange: false,
    },
  });
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleListAssignee = (currentPost: PostDto | undefined) => {
    const assigneeLength = currentPost?.issue?.assignees?.length;
    if (assigneeLength === undefined || assigneeLength === 0) return "--";
    let result = "";
    for (let i = 0; i < assigneeLength - 1; ++i) {
      const assignee = currentPost?.issue?.assignees[i];
      result = result.concat(`${assignee?.name ?? assignee?.username}, `);
    }
    const lastAssignee = currentPost?.issue?.assignees[assigneeLength - 1];
    return result.concat(`${lastAssignee?.name ?? lastAssignee?.username}`);
  };
  async function getPost() {
    try {
      let response = await getSinglePost(
        Number(currentPostId as unknown as string),
        state.user?.token!
      );
      const postResponse: PostDto = response.data.data;
      setPost(postResponse);
      setChange({
        title: {
          ...change.title,
          value: postResponse.title,
        },
        description: {
          ...change.description,
          value: postResponse.description,
        },
        applyFor: {
          ...change.applyFor,
          value: postResponse.applyFor,
        },
        module: {
          ...change.module,
          value: String(postResponse.module?.id),
        },
        status: {
          ...change.status,
          value: postResponse.status,
        },
      });
      response = await getModule(state.user?.token!);
      const modulesResponse: SystemCodeDetailDto[] = response.data.data;
      setOptions({
        modules: modulesResponse,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function approvePost() {
    const payload: {
      title?: string;
      description?: string;
      applyFor?: string;
      module?: {
        id: number;
      };
      status?: string;
    } = {
      title: change.title.isChange ? change.title.value : undefined,
      description: change.description.isChange
        ? change.description.value
        : undefined,
      applyFor: change.applyFor.isChange ? change.applyFor.value : undefined,
      module: change.module.isChange
        ? {
            id: change.module.value as unknown as number,
          }
        : undefined,
      status: change.status.isChange ? change.status.value : undefined,
    };
    console.log(payload);
    try {
      await updatePost(currentPostId, payload, state.user?.token!);
      setOpenUpdatePost(false);
      navigate(0);
    } catch (e) {
      console.log(e);
      setOpenError(true);
      setErrorMessage(e.response.data.data.message);
    }
  }
  useEffect(() => {
    try {
      getPost();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <Dialog
      open={openUpdatePost}
      onClose={() => setOpenUpdatePost(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography>Update post</Typography>
      </DialogTitle>
      <DialogContent>
        {post && (
          <Box display="flex">
            <Card sx={{ width: "725px" }}>
              <CardHeader
                avatar={<Avatar>{post?.createdBy[0]}</Avatar>}
                title="PDD_ThuyTrang.Nguyen"
                subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
              />
              <CardContent sx={{ paddingTop: "0px" }}>
                <Stack spacing="10px">
                  <TextField
                    fullWidth
                    size="small"
                    label="Post title"
                    value={change.title.value}
                    onChange={(e) =>
                      setChange({
                        ...change,
                        title: {
                          value: e.target.value,
                          isChange: true,
                        },
                      })
                    }
                  />
                  <Typography variant="body2">
                    <strong>Issue: </strong>
                    {`"${post.issue?.content}"`}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    label="Description"
                    multiline
                    rows={4}
                    value={change.description.value}
                    onChange={(e) =>
                      setChange({
                        ...change,
                        description: {
                          value: e.target.value,
                          isChange: true,
                        },
                      })
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ width: "277px" }}>
              <CardHeader avatar={<IoStarOutline />} title="Details" />
              <CardContent sx={{ paddingTop: "0px" }}>
                <Stack spacing="10px">
                  <FormControl size="small">
                    <InputLabel id="status-label">
                      <Typography fontSize="13px">Status</Typography>
                    </InputLabel>
                    <Select
                      value={change.status.value}
                      fullWidth
                      id="status-label"
                      label="Status"
                      onChange={(e) => {
                        setChange({
                          ...change,
                          status: {
                            value: e.target.value,
                            isChange: true,
                          },
                        });
                      }}
                    >
                      {optionsPostStatus.map((s) => (
                        <MenuItem key={s} value={s}>
                          <Typography fontSize="13px">
                            {s.replace("_", " ")}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Customer
                    </Typography>
                    <Typography fontSize="13px">
                      {post?.issue?.customer?.description ??
                        post?.issue?.customer?.codeName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Assignee
                    </Typography>
                    <Typography fontSize="13px">
                      {handleListAssignee(post)}
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
                      {post.issue?.type?.description ??
                        post.issue?.type?.codeName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Version
                    </Typography>
                    <Typography fontSize="13px">
                      {post.issue?.version}
                    </Typography>
                  </Box>
                  <FormControl size="small">
                    <InputLabel id="module-label">Module</InputLabel>
                    <Select
                      value={change.module.value}
                      fullWidth
                      id="module-label"
                      label="Status"
                      onChange={(e) => {
                        setChange({
                          ...change,
                          module: {
                            value: e.target.value,
                            isChange: true,
                          },
                        });
                      }}
                    >
                      {options.modules.map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                          <Typography fontSize="13px">
                            {m.description ?? m.codeName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel id="applyFor-label">Apply for</InputLabel>
                    <Select
                      value={change.applyFor.value}
                      fullWidth
                      id="applyFor-label"
                      label="Status"
                      onChange={(e) =>
                        setChange({
                          ...change,
                          applyFor: {
                            value: e.target.value,
                            isChange: true,
                          },
                        })
                      }
                    >
                      {optionsApplyFor.map((a) => (
                        <MenuItem key={a.id} value={a.name}>
                          <Typography fontSize="13px">
                            {a.name.replace("_", " ")}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Due date
                    </Typography>
                    <Typography fontSize="13px">
                      {post.issue?.dueDate}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Is appendix
                    </Typography>
                    <Typography fontSize="13px">
                      {post.issue?.isAppendix === true ? "Yes" : "No"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Is deal customer
                    </Typography>
                    <Typography fontSize="13px">
                      {post.issue?.isDealCustomer === true ? "Yes" : "No"}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          disabled={post === undefined || post === null}
          variant="contained"
          sx={{
            bgcolor: "#F48023",
          }}
          onClick={approvePost}
        >
          <Typography
            fontSize="13px"
            color="white"
            sx={{ textTransform: "none" }}
          >
            Update
          </Typography>
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ bgcolor: "black", ml: "10px" }}
          onClick={() => setOpenUpdatePost(false)}
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

export default DialogUpdatePost;
