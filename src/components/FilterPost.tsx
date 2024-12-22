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
import { CgSearch } from "react-icons/cg";
import { FilterPostState, OptionFilterPost } from "../types";

const FilterPost = ({
  filter,
  setFilter,
  options,
  handleSearch,
}: {
  filter: FilterPostState;
  setFilter: (f: FilterPostState) => void;
  options: OptionFilterPost;
  handleSearch: () => Promise<void>;
}) => {
  const handleChangeReporter = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFilter({
      ...filter,
      reporters: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleChangeAssignee = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFilter({
      ...filter,
      assignees: typeof value === "string" ? value.split(",") : value,
    });
  };
  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box>
          <Typography fontSize="13px">Date range</Typography>
          <DatePicker
            sx={{ width: "140px", mt: 2 }}
            value={filter.fromDate}
            onChange={(e) => setFilter({ ...filter, fromDate: e })}
            label="From date"
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            sx={{ width: "170px", marginLeft: "10px", mt: 2 }}
            value={filter.toDate}
            onChange={(e) => setFilter({ ...filter, toDate: e })}
            label="To date"
            slotProps={{ textField: { size: "small" } }}
          />
        </Box>
        <Box marginLeft="16px">
          <Typography fontSize="13px">Date Type</Typography>
          <FormControl size="small" sx={{ minWidth: "220px", mt: 2 }}>
            <Select
              value={filter.dateType}
              onChange={(e) =>
                setFilter({ ...filter, dateType: e.target.value })
              }
            >
              {options.dateType.map((d) => {
                return <MenuItem value={d.value}>{d.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box marginLeft="16px">
          <Button
            variant="contained"
            onClick={() => {
              handleSearch();
            }}
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
            value={filter.status}
            label="Status"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.statuses.map((s) => {
              return <MenuItem value={s}>{s}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "200px" }}>
          <InputLabel id="post-reporter">Reporter</InputLabel>
          <Select
            labelId="post-reporter"
            multiple
            value={filter.reporters}
            label="Reporter"
            input={<OutlinedInput label="Reporter" />}
            onChange={handleChangeReporter}
          >
            {options.reporters.map((r) => {
              return (
                <MenuItem value={r.username}>{r.name ?? r.username}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "100px" }}>
          <InputLabel id="post-assignee">Assignee</InputLabel>
          <Select
            labelId="post-assignee"
            multiple
            value={filter.assignees}
            label="Assignee"
            input={<OutlinedInput label="Assignee" />}
            onChange={handleChangeAssignee}
          >
            {options.assignees.map((a) => {
              return <MenuItem value={a.id}>{a.name ?? a.username}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "90px" }}>
          <InputLabel id="post-type">Type</InputLabel>
          <Select
            labelId="post-type"
            value={filter.type}
            label="Type"
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.types.map((t) => {
              return (
                <MenuItem value={t.id}>{t.description ?? t.codeName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "120px" }}>
          <InputLabel id="post-customer">Customer</InputLabel>
          <Select
            labelId="post-customer"
            value={filter.customer}
            label="Customer"
            onChange={(e) => setFilter({ ...filter, customer: e.target.value })}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.customers.map((c) => {
              return (
                <MenuItem value={c.id}>{c.description ?? c.codeName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "100px" }}>
          <InputLabel id="post-module">Module</InputLabel>
          <Select
            labelId="post-module"
            value={filter.module}
            label="Module"
            onChange={(e) => setFilter({ ...filter, module: e.target.value })}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.modules.map((m) => {
              return (
                <MenuItem value={m.id}>{m.description ?? m.codeName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "100px" }}>
          <InputLabel id="post-version">Version</InputLabel>
          <Select
            labelId="post-version"
            value={filter.version}
            label="Version"
            onChange={(e) => setFilter({ ...filter, version: e.target.value })}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.versions.map((v) => {
              return <MenuItem value={v}>{v}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "150px" }}>
          <InputLabel id="post-deal-customer">Deal Customer</InputLabel>
          <Select
            labelId="post-deal-customer"
            value={filter.isDealCustomer}
            label="Deal Customer"
            onChange={(e) =>
              setFilter({ ...filter, isDealCustomer: e.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.isDealCustomers.map((s) => {
              return (
                <MenuItem value={s}>{s === "true" ? "Yes" : "No"}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default FilterPost;
