import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { statusIssueConstants } from "../constants/statusContants";
const dateTypeConstants = [
  {
    value: "dueDate",
    label: "Due Date",
  },
  {
    value: "createdDate",
    label: "Created Date",
  },
];
const reporters = [
  {
    id: 1,
    name: "PDD_ThuyTrang.Nguyen",
  },
  {
    id: 2,
    name: "SAP_NhatThanh.Nguyen",
  },
];
const Filter = () => {
  const [dateType, setDateType] = useState<string>(dateTypeConstants[0].value);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [status, setStatus] = useState<string>("");
  const [reporter, setReporter] = useState<string[]>([]);
  const [assignee, setAssignee] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [module, setModule] = useState<string>("");
  const handleChangeReporter = (event: SelectChangeEvent<typeof reporter>) => {
    const {
      target: { value },
    } = event;
    setReporter(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box>
          <Typography fontSize="13px">Date range</Typography>
          <DatePicker
            sx={{ width: "170px" }}
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            sx={{ width: "170px", marginLeft: "10px" }}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
        </Box>
        <Box marginLeft="16px">
          <Typography fontSize="13px">Date Type</Typography>
          <FormControl size="small" sx={{ minWidth: "220px" }}>
            <Select
              value={dateType}
              onChange={(e) => setDateType(e.target.value)}
            >
              {dateTypeConstants.map((d) => {
                return <MenuItem value={d.value}>{d.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box marginLeft="16px">
          <Button
            variant="contained"
            startIcon={<CgSearch />}
            sx={{
              textTransform: "none",
              bgcolor: "#F48023",
            }}
          >
            <Typography fontSize="13px">Search</Typography>
          </Button>
        </Box>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        marginTop="20px"
        useFlexGap
      >
        <FormControl size="small" sx={{ width: "140px" }}>
          <InputLabel id="post-status">Status</InputLabel>
          <Select
            labelId="post-status"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusIssueConstants.map((s) => {
              return <MenuItem value={s.value}>{s.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "200px" }}>
          <InputLabel id="post-reporter">Reporter</InputLabel>
          <Select
            labelId="post-reporter"
            multiple
            value={reporter}
            label="Reporter"
            input={<OutlinedInput label="Reporter" />}
            onChange={handleChangeReporter}
          >
            {reporters.map((r) => {
              return <MenuItem value={r.id}>{r.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "100px" }}>
          <InputLabel id="post-assignee">Assignee</InputLabel>
          <Select
            labelId="post-assignee"
            multiple
            value={reporter}
            label="Assignee"
            input={<OutlinedInput label="Assignee" />}
            onChange={handleChangeReporter}
          >
            {reporters.map((r) => {
              return <MenuItem value={r.id}>{r.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "90px" }}>
          <InputLabel id="post-type">Type</InputLabel>
          <Select
            labelId="post-type"
            value={status}
            label="Type"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusIssueConstants.map((s) => {
              return <MenuItem value={s.value}>{s.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "120px" }}>
          <InputLabel id="post-customer">Customer</InputLabel>
          <Select
            labelId="post-customer"
            value={status}
            label="Customer"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusIssueConstants.map((s) => {
              return <MenuItem value={s.value}>{s.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "100px" }}>
          <InputLabel id="post-module">Module</InputLabel>
          <Select
            labelId="post-module"
            value={status}
            label="Module"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusIssueConstants.map((s) => {
              return <MenuItem value={s.value}>{s.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "100px" }}>
          <InputLabel id="post-version">Version</InputLabel>
          <Select
            labelId="post-version"
            value={status}
            label="Version"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusIssueConstants.map((s) => {
              return <MenuItem value={s.value}>{s.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "150px" }}>
          <InputLabel id="post-deal-customer">Deal Customer</InputLabel>
          <Select
            labelId="post-deal-customer"
            value={status}
            label="Deal Customer"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusIssueConstants.map((s) => {
              return <MenuItem value={s.value}>{s.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default Filter;
