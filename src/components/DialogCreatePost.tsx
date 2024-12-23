import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Link,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IssueDto, SystemCodeDetailDto } from "../dtos";
import { IoStarOutline } from "react-icons/io5";
import { getSingleIssue } from "../axios/issue";
import { useAppStore } from "../hooks";
import { getCustomer, getModule } from "../axios/systemcode";
import { baseImageUrl } from "../axios/config";
import { useNavigate } from "react-router";
import { createNewPost } from "../axios/post";

const DialogCreatePost = ({
  open,
  setOpenCreatePost,
  currentIssueId,
}: {
  open: boolean;
  setOpenCreatePost: (open: boolean) => void;
  currentIssueId: number;
}) => {
  const [currentIssue, setCurrentIssue] = useState<IssueDto | undefined | null>(
    undefined
  );
  const navigate = useNavigate();
  const { state } = useAppStore();
  const [options, setOptions] = useState<{
    customers: SystemCodeDetailDto[];
    modules: SystemCodeDetailDto[];
    applyFor: string[];
  }>({
    customers: [],
    modules: [],
    applyFor: ["ALL_SITE", "CUSTOMIZED"],
  });
  const [change, setChange] = useState<{
    title: string;
    description: string;
    customer: string;
    module: string;
    applyFor: string;
  }>({
    title: "",
    description: "",
    customer: "",
    module: "",
    applyFor: "",
  });
  async function getInfo() {
    let response = await getSingleIssue(currentIssueId, state.user?.token);
    const issueResponse: IssueDto = response.data.data;
    response = await getCustomer(state.user?.token);
    const customersResponse: SystemCodeDetailDto[] = response.data.data;
    response = await getModule(state.user?.token);
    const modulesResponse: SystemCodeDetailDto[] = response.data.data;
    setCurrentIssue(issueResponse);
    setOptions({
      ...options,
      customers: customersResponse,
      modules: modulesResponse,
    });
    setChange({
      ...change,
      customer: String(issueResponse.customer?.id),
    });
  }
  async function handleCreatePost() {
    const payload = {
      issue: {
        id: currentIssue?.id,
      },
      title: change.title,
      description: change.description,
      applyFor: change.applyFor,
      customer: {
        id: Number(change.customer),
      },
      module: {
        id: Number(change.module),
      },
    };
    try {
      await createNewPost(payload, state.user?.token);
      setOpenCreatePost(false);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    currentIssue && (
      <Dialog
        open={open}
        onClose={() => setOpenCreatePost(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography>Create post</Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex">
            {currentIssue && (
              <Card sx={{ width: "725px" }}>
                <CardHeader
                  avatar={<Avatar>{currentIssue.createdBy[0]}</Avatar>}
                  title={currentIssue.createdBy}
                  subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
                />
                <CardContent>
                  <Typography fontSize="13px">
                    <strong>Issue: </strong>@{currentIssue.createdBy}:{" "}
                    {currentIssue.content}
                  </Typography>
                  <Typography fontSize="13px">
                    <Link href={currentIssue.penpotPrototypeLink}>
                      Prototype link
                    </Link>
                  </Typography>
                  <Box
                    marginTop="10px"
                    component="section"
                    display="flex"
                    justifyContent="center"
                  >
                    <img
                      src={`${baseImageUrl}/${currentIssue.image?.imageUrl}`}
                      alt="Issue"
                      width="300px"
                      height="100%"
                    />
                  </Box>
                </CardContent>
              </Card>
            )}
            <Card sx={{ width: "277px" }}>
              <CardHeader avatar={<IoStarOutline />} title="Details" />
              <CardContent sx={{ paddingTop: "0px" }}>
                <Stack spacing="10px">
                  <TextField
                    size="small"
                    label="Summary"
                    required
                    value={change.title}
                    onChange={(e) =>
                      setChange({
                        ...change,
                        title: e.target.value,
                      })
                    }
                  />
                  <TextField
                    size="small"
                    label="Description"
                    required
                    multiline
                    rows={4}
                    value={change.description}
                    onChange={(e) =>
                      setChange({
                        ...change,
                        description: e.target.value,
                      })
                    }
                  />
                  <FormControl size="small" required>
                    <InputLabel id="customer-label">Customer</InputLabel>
                    <Select
                      labelId="customer-label"
                      size="small"
                      fullWidth
                      label="Customer *"
                      value={change.customer}
                      onChange={(e) => {
                        setChange({
                          ...change,
                          customer: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {options.customers.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <Typography fontSize="13px">
                            {c.description ?? c.codeName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" required>
                    <InputLabel id="module-label-required">Module</InputLabel>
                    <Select
                      labelId="module-label-required"
                      size="small"
                      label="Module *"
                      value={change.module}
                      onChange={(e) => {
                        setChange({
                          ...change,
                          module: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {options.modules.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <Typography fontSize="13px">
                            {c.description ?? c.codeName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel id="apply-for-label">Apply for</InputLabel>
                    <Select
                      labelId="apply-for-label"
                      size="small"
                      fullWidth
                      label="Apply for"
                      value={change.applyFor}
                      onChange={(e) => {
                        setChange({
                          ...change,
                          applyFor: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {options.applyFor.map((a) => (
                        <MenuItem key={a} value={a}>
                          <Typography fontSize="13px">
                            {a.replace("_", " ")}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#F48023",
            }}
            onClick={() => {
              handleCreatePost();
            }}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Create
            </Typography>
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ bgcolor: "black", ml: "10px" }}
            onClick={() => {
              setChange({
                title: "",
                description: "",
                customer: "",
                module: "",
                applyFor: "",
              });
              setOpenCreatePost(false);
            }}
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
    )
  );
};

export default DialogCreatePost;
