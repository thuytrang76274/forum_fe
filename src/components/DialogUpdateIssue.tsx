import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Card,
  CardHeader,
  Avatar,
  Button,
  CardContent,
  Box,
  Stack,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { IoStarOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IssueDto, SystemCodeDetailDto, UserDto } from "../dtos";
import { DatePicker } from "@mui/x-date-pickers";
import { getSingleIssue, updateIssue } from "../axios/issue";
import { useAppStore } from "../hooks";
import { getCustomer, getType } from "../axios/systemcode";
import { getAllUsers } from "../axios/user";
import { baseImageUrl } from "../axios/config";
import { useNavigate } from "react-router";

const issueStatus = [
  "NEW",
  "ASSIGNED",
  "DISCUSSING",
  "ANALYST",
  "DONE",
  "PENDING",
  "CLOSE",
];

const initState = {
  customer: { value: undefined, isChange: false },
  assignee: { values: [], isChange: false },
  dueDate: { value: undefined, isChange: false },
  status: { value: undefined, isChange: false },
  isAppendix: { value: undefined, isChange: false },
  isDealCustomer: { value: undefined, isChange: false },
  type: { value: undefined, isChange: false },
  version: { value: undefined, isChange: false },
};

const DialogUpdateIssue = ({
  open,
  setOpenUpdateIssue,
  currentIssueId,
}: {
  open: boolean;
  currentIssueId: number;
  setOpenUpdateIssue: (open: boolean) => void;
}) => {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const [currentIssue, setCurrentIssue] = useState<IssueDto | undefined>(
    undefined
  );
  const [change, setChange] = useState<{
    customer: {
      value: number | undefined;
      isChange: boolean;
    };
    assignee: {
      values: string[];
      isChange: boolean;
    };
    dueDate: { value: Dayjs | null | undefined; isChange: boolean };
    status: { value: string | undefined; isChange: boolean };
    isAppendix: { value: string | undefined; isChange: boolean };
    isDealCustomer: { value: string | undefined; isChange: boolean };
    type: { value: number | undefined; isChange: boolean };
    version: { value: string | undefined; isChange: boolean };
  }>(initState);
  const [options, setOptions] = useState<{
    customer: SystemCodeDetailDto[];
    type: SystemCodeDetailDto[];
    assignee: UserDto[];
    status: string[];
  }>({
    customer: [],
    type: [],
    assignee: [],
    status: [],
  });
  async function getInfo() {
    let response = await getSingleIssue(currentIssueId, state.user?.token);
    const issue: IssueDto = response.data.data;
    setCurrentIssue(issue);
    response = await getCustomer(state.user?.token);
    const customers: SystemCodeDetailDto[] = response.data.data;
    response = await getAllUsers(state.user?.token);
    const assignees: UserDto[] = response.data.data;
    response = await getType(state.user?.token);
    const types: SystemCodeDetailDto[] = response.data.data;
    setOptions({
      customer: customers,
      type: types,
      assignee: assignees,
      status: issueStatus,
    });
    setChange({
      customer: {
        isChange: false,
        value: issue.customer?.id,
      },
      dueDate: {
        isChange: issue.dueDate === null ? true : false,
        value:
          issue.dueDate === null ? dayjs(new Date()) : dayjs(issue.dueDate),
      },
      status: {
        isChange: false,
        value: issue.status,
      },
      assignee: {
        isChange: false,
        values: issue.assignees.map((i) => String(i.id)),
      },
      isAppendix: {
        value: issue.isAppendix ? "true" : "false",
        isChange: false,
      },
      isDealCustomer: {
        value: issue.isDealCustomer ? "true" : "false",
        isChange: false,
      },
      type: {
        value: issue.type?.id,
        isChange: false,
      },
      version: {
        value: issue.version,
        isChange: false,
      },
    });
  }
  async function handleUpdateIssue() {
    const payload = {
      customer: change.customer.isChange
        ? {
            id: change.customer.value,
          }
        : undefined,
      assignees: change.assignee.isChange
        ? change.assignee.values.map((a) => {
            return {
              id: a,
            };
          })
        : undefined,
      dueDate: change.dueDate.isChange
        ? dayjs(change.dueDate.value).format("YYYY-MM-DD")
        : undefined,
      status: change.status.isChange ? change.status.value : undefined,
      isAppendix: change.isAppendix.isChange
        ? change.isAppendix.value === "true"
        : undefined,
      isDealCustomer: change.isDealCustomer.isChange
        ? change.isDealCustomer.value === "true"
        : undefined,
      type: change.type.isChange ? { id: change.type.value } : undefined,
      version: change.version.isChange ? change.version.value : undefined,
    };
    try {
      console.log(payload);
      await updateIssue(currentIssueId, payload, state.user?.token);
      setOpenUpdateIssue(false);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={() => setOpenUpdateIssue(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Typography>Edit issue</Typography>
      </DialogTitle>
      <DialogContent>
        {currentIssue && (
          <Box display="flex">
            <Card sx={{ width: "725px" }}>
              <CardHeader
                avatar={<Avatar>{currentIssue.createdBy[0]}</Avatar>}
                title={currentIssue.createdBy}
                subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
              />
              <CardContent>
                <Typography sx={{ fontSize: "13px" }}>
                  <strong>Issue: </strong>@{currentIssue.createdBy}:{" "}
                  {currentIssue.content}
                </Typography>
                <Box
                  marginTop="16px"
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
                      {options.status.map((o) => (
                        <MenuItem key={o} value={o}>
                          <Typography fontSize="13px">{o}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel id="customer-label">
                      <Typography fontSize="13px">Customer</Typography>
                    </InputLabel>
                    <Select
                      labelId="customer-label"
                      size="small"
                      fullWidth
                      label="Customer"
                      value={change.customer.value}
                      onChange={(e) => {
                        setChange({
                          ...change,
                          customer: {
                            value: e.target.value as number,
                            isChange: true,
                          },
                        });
                      }}
                    >
                      {options.customer.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <Typography fontSize="13px">
                            {c.description ?? c.codeName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="assignee-label">
                      <Typography fontSize="13px">Assignee</Typography>
                    </InputLabel>
                    <Select
                      labelId="assignee-label"
                      id="assignee-name"
                      multiple
                      value={change.assignee.values}
                      label="Assignee"
                      onChange={(e: SelectChangeEvent<string[]>) => {
                        const v = e.target.value;
                        setChange(
                          typeof v === "string"
                            ? {
                                ...change,
                                assignee: {
                                  values: v.split(","),
                                  isChange: true,
                                },
                              }
                            : {
                                ...change,
                                assignee: {
                                  values: v,
                                  isChange: true,
                                },
                              }
                        );
                      }}
                    >
                      {options.assignee.map((a) => (
                        <MenuItem key={a.id} value={String(a.id)}>
                          <Typography fontSize="13px">
                            {a.name ?? a.username}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel id="type-label">
                      <Typography fontSize="13px">Type</Typography>
                    </InputLabel>
                    <Select
                      labelId="type-label"
                      size="small"
                      fullWidth
                      label="Type"
                      value={change.type.value}
                      onChange={(e) => {
                        setChange({
                          ...change,
                          type: {
                            value: e.target.value as number,
                            isChange: true,
                          },
                        });
                      }}
                    >
                      {options.type.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <Typography fontSize="13px">
                            {c.description ?? c.codeName}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box>
                    <TextField
                      size="small"
                      value={change.version.value}
                      label="Version"
                      fullWidth
                      onChange={(e) =>
                        setChange({
                          ...change,
                          version: {
                            value: e.target.value,
                            isChange: true,
                          },
                        })
                      }
                    />
                  </Box>
                  <Box>
                    <FormControl size="small">
                      <DatePicker
                        label={
                          <Typography fontSize="13px">Due date</Typography>
                        }
                        slotProps={{ textField: { size: "small" } }}
                        value={dayjs(change.dueDate.value)}
                        onChange={(v) => {
                          setChange({
                            ...change,
                            dueDate: {
                              value: v,
                              isChange: true,
                            },
                          });
                        }}
                      />
                    </FormControl>
                  </Box>
                  <FormControl size="small">
                    <InputLabel id="is-appendix-label">
                      <Typography fontSize="13px">Is appendix</Typography>
                    </InputLabel>
                    <Select
                      labelId="is-appendix-label"
                      size="small"
                      fullWidth
                      label="Is appendix"
                      value={change.isAppendix.value}
                      onChange={(e) => {
                        setChange({
                          ...change,
                          isAppendix: {
                            value: e.target.value,
                            isChange: true,
                          },
                        });
                      }}
                    >
                      <MenuItem key={"true"} value={"true"}>
                        <Typography fontSize="13px">Yes</Typography>
                      </MenuItem>
                      <MenuItem key={"false"} value={"false"}>
                        <Typography fontSize="13px">No</Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {currentIssue.status === "DONE" ? (
                    <FormControl size="small">
                      <InputLabel id="is-deal-customer-label">
                        <Typography fontSize="13px">
                          Is deal customer
                        </Typography>
                      </InputLabel>
                      <Select
                        labelId="is-deal-customer-label"
                        size="small"
                        fullWidth
                        label="Is deal customer"
                        value={change.isDealCustomer.value}
                        onChange={(e) => {
                          setChange({
                            ...change,
                            isDealCustomer: {
                              value: e.target.value,
                              isChange: true,
                            },
                          });
                        }}
                      >
                        <MenuItem key={"true"} value={"true"}>
                          <Typography fontSize="13px">Yes</Typography>
                        </MenuItem>
                        <MenuItem key={"false"} value={"false"}>
                          <Typography fontSize="13px">No</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Box>
                      <Typography fontSize="13px" fontWeight="700">
                        Is deal customer
                      </Typography>
                      <Typography fontSize="13px">
                        {currentIssue.isDealCustomer ? "Yes" : "No"}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: "#F48023",
          }}
          onClick={handleUpdateIssue}
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
          onClick={() => {
            setOpenUpdateIssue(false);
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
  );
};

export default DialogUpdateIssue;
