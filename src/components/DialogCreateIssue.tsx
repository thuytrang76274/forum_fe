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
  DialogActions,
  Button,
  TextField,
  styled,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { IoStarOutline } from "react-icons/io5";
import { useAppStore } from "../hooks";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { SystemCodeDetailDto, UserDto } from "../dtos";
import { getType, getCustomer } from "../axios/systemcode";
import { getAllUsers } from "../axios/user";
import { createIssue } from "../axios/issue";
import { useNavigate } from "react-router";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DialogCreateIssue = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const [options, setOptions] = useState<{
    customers: SystemCodeDetailDto[];
    assignees: UserDto[];
    types: SystemCodeDetailDto[];
    isAppendix: string[];
  }>({
    customers: [],
    assignees: [],
    types: [],
    isAppendix: ["true", "false"],
  });
  const [change, setChange] = useState<{
    content: string;
    customer: string;
    assignees: string[];
    type: string;
    dueDate: Dayjs | null;
    files: FileList | null;
  }>({
    content: "",
    customer: "",
    assignees: [],
    type: "",
    dueDate: null,
    files: null,
  });
  async function getInfo() {
    let response = await getType(state.user?.token);
    const typesResponse: SystemCodeDetailDto[] = response.data.data;
    response = await getAllUsers(state.user?.token);
    const assigneesResponse: UserDto[] = response.data.data;
    response = await getCustomer(state.user?.token);
    const customersResponse: SystemCodeDetailDto[] = response.data.data;
    setOptions({
      ...options,
      customers: customersResponse,
      assignees: assigneesResponse,
      types: typesResponse,
    });
  }
  const handleChangeAssignee = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setChange({
      ...change,
      assignees: typeof value === "string" ? value.split(",") : value,
    });
  };
  async function handleCreateIssue() {
    try {
      console.log(change);
      const payload = {
        content: change.content.length === 0 ? null : change.content,
        dueDate:
          change.dueDate === null ? null : change.dueDate.format("YYYY-MM-DD"),
        customer:
          change.customer.length === 0
            ? null
            : {
                id: change.customer,
              },
        type:
          change.type.length === 0
            ? null
            : {
                id: change.type,
              },
        assignees:
          change.assignees.length === 0
            ? null
            : change.assignees.map((a) => {
                return {
                  id: Number(a),
                };
              }),
      };
      console.log(JSON.stringify(payload));
      const formData = new FormData();
      formData.append("issue", JSON.stringify(payload));
      if (change.files !== null) {
        formData.append("image", change.files.item(0));
      }
      await createIssue(formData, state.user?.token);
      setOpen(false);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  }
  function handleClose() {
    setChange({
      content: "",
      customer: "",
      assignees: [],
      type: "",
      dueDate: null,
      files: null,
    });
    setOpen(false);
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography>Create issue</Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex">
          <Card sx={{ width: "725px" }}>
            <CardHeader
              avatar={<Avatar>{state.user?.name[0]}</Avatar>}
              title={state.user?.name}
              subheader={dayjs(new Date()).format("DD/MM/YYYY")}
            />
            <CardContent>
              <TextField
                required
                value={change.content}
                onChange={(e) =>
                  setChange({
                    ...change,
                    content: e.target.value,
                  })
                }
                size="small"
                fullWidth
                label="Issue description"
                multiline
                rows={4}
              />
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="contained"
                sx={{ textTransform: "none", bgcolor: "#F48023", mt: 2 }}
              >
                Upload image to describe the issue
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setChange({
                      ...change,
                      files: event.target.files,
                    })
                  }
                />
              </Button>
              {change.files !== null && (
                <Typography fontSize="13px">
                  {change.files.item(0)?.name}
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card sx={{ width: "277px" }}>
            <CardHeader avatar={<IoStarOutline />} title="Details" />
            <CardContent sx={{ paddingTop: "0px" }}>
              <Stack spacing="10px">
                <FormControl size="small" fullWidth required>
                  <InputLabel id="customer-label">Customer</InputLabel>
                  <Select
                    value={change.customer}
                    id="customer-label"
                    label="Customer"
                    onChange={(e) =>
                      setChange({ ...change, customer: e.target.value })
                    }
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
                <FormControl size="small" fullWidth>
                  <InputLabel id="assignee-label">Assignee</InputLabel>
                  <Select
                    value={change.assignees}
                    id="assignee-label"
                    label="Assignees"
                    multiple
                    onChange={handleChangeAssignee}
                  >
                    {options.assignees.map((a) => (
                      <MenuItem key={a.id} value={a.id}>
                        <Typography fontSize="13px">
                          {a.name ?? a.username}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth required>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    value={change.type}
                    id="type-label"
                    label="Type"
                    onChange={(e) => {
                      setChange({ ...change, type: e.target.value });
                    }}
                  >
                    {options.types.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        <Typography fontSize="13px">
                          {t.description ?? t.codeName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField size="small" label="Version" />
                <DatePicker
                  value={change.dueDate}
                  slotProps={{ textField: { size: "small" } }}
                  label="Due date"
                  onChange={(e) => setChange({ ...change, dueDate: e })}
                />
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
            handleCreateIssue();
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

export default DialogCreateIssue;
