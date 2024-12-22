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
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { IoStarOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IssueDto } from "../dtos";
import { DatePicker } from "@mui/x-date-pickers";

const issue = {
  id: 1,
  customer: {
    id: 1,
    codeName: "TTC AGRIS",
  },
  type: {
    id: 1,
    codeName: "Website",
  },
  version: "2.1.0",
  dueDate: "2024-12-30",
  assignees: [
    { id: 1, name: "PDD_Thy Nguyen", username: "pddthynguyen" },
    {
      id: 2,
      name: "PDD_ThuyTrang Nguyen",
      username: "pddthuytrangnguyen",
    },
  ],
  content:
    "The process of manually downloading inventory from the system every day is often repeated. Can the system do it automatically and send it to me?",
  createdBy: "xxxx",
  image: {
    id: 1,
    imageUrl: "https://www.w3schools.com/images/lamp.jpg",
  },
  isAppendix: true,
  isDealCustomer: false,
  status: "NEW",
};

const issueStatus = [
  "NEW",
  "ASSIGNED",
  "DISCUSSING",
  "ANALYST",
  "DONE",
  "PENDING",
  "CLOSE",
];

const optionConstants = {
  customers: [
    { id: 1, codeName: "TTCARGIS", description: "TT CARGIS" },
    { id: 2, codeName: "SAP", description: undefined },
  ],
  assignee: [
    { id: 1, name: "PDD_Thy Nguyen", username: "pddthynguyen" },
    {
      id: 2,
      name: "PDD_ThuyTrang Nguyen",
      username: "pddthuytrangnguyen",
    },
    {
      id: 3,
      name: "SAP_Thanh Nguyen",
      username: "sjdgkljs",
    },
  ],
  status: issueStatus,
};

const DialogUpdateIssue = ({
  open,
  handleClose,
  currentIssueId,
}: {
  open: boolean;
  currentIssueId: number;
  handleClose: () => void;
}) => {
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
  }>({
    customer: { value: undefined, isChange: false },
    assignee: { values: [], isChange: false },
    dueDate: { value: undefined, isChange: false },
    status: { value: undefined, isChange: false },
  });
  const [options, setOptions] = useState<{
    customers: {
      id: number;
      codeName: string;
      description: string | undefined;
    }[];
    assignee: { id: number; name: string; username: string }[];
    status: string[];
  }>({
    customers: [],
    assignee: [],
    status: [],
  });
  useEffect(() => {
    console.log(currentIssueId);
    setCurrentIssue(issue);
    setOptions(optionConstants);
    setChange({
      customer: {
        isChange: false,
        value: options.customers.find((i) => i.id === issue.customer.id)?.id,
      },
      dueDate: {
        isChange: false,
        value: dayjs(issue.dueDate),
      },
      status: {
        isChange: false,
        value: issue.status,
      },
      assignee: {
        isChange: false,
        values: issue.assignees.map((i) => String(i.id)),
      },
    });
    console.log(change);
  }, []);
  return (
    currentIssue && (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography>Edit issue</Typography>
        </DialogTitle>
        <DialogContent>
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
                    src={currentIssue.image?.imageUrl}
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
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Type
                    </Typography>
                    <Typography fontSize="13px">
                      {currentIssue.type?.codeName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Version
                    </Typography>
                    <Typography fontSize="13px">
                      {currentIssue.version}
                    </Typography>
                  </Box>
                  <Box>
                    <FormControl size="small">
                      <DatePicker
                        label={
                          <Typography fontSize="13px">Due date</Typography>
                        }
                        value={dayjs(change.dueDate.value)}
                        onChange={(v) =>
                          setChange({
                            ...change,
                            dueDate: {
                              value: v,
                              isChange: true,
                            },
                          })
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Is appendix
                    </Typography>
                    <Typography fontSize="13px">
                      {currentIssue.isAppendix ? "Yes" : "No"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="13px" fontWeight="700">
                      Is deal customer
                    </Typography>
                    <Typography fontSize="13px">
                      {currentIssue.isDealCustomer ? "Yes" : "No"}
                    </Typography>
                  </Box>
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
            onClick={() => console.log(change)}
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
    )
  );
};

export default DialogUpdateIssue;
