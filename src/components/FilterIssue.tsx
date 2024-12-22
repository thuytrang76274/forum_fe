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
import { FilterIssueState, OptionFilterIssue } from "../types";

const FilterIssue = ({
  filter,
  setFilter,
  options,
  handleSearch,
}: {
  filter: FilterIssueState;
  setFilter: (filter: FilterIssueState) => void;
  options: OptionFilterIssue;
  handleSearch: () => Promise<void>;
}) => {
  const handleChangeAssignees = (event: SelectChangeEvent<string[]>) => {
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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ width: "725px" }}
      >
        <Box>
          <Typography fontSize="13px">Date range</Typography>
          <DatePicker
            sx={{ width: "170px", mt: 2 }}
            value={filter.fromDate}
            label="From date"
            onChange={(value) => setFilter({ ...filter, fromDate: value })}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            sx={{ width: "170px", marginLeft: "10px", mt: 2 }}
            value={filter.toDate}
            label="To date"
            onChange={(value) => setFilter({ ...filter, toDate: value })}
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
            startIcon={<CgSearch />}
            onClick={() => {
              handleSearch();
            }}
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
        sx={{ width: "725px" }}
        useFlexGap
      >
        <FormControl size="small" sx={{ width: "140px" }}>
          <InputLabel id="issue-status">Status</InputLabel>
          <Select
            labelId="issue-status"
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
          <InputLabel id="issue-assignee">Assignee</InputLabel>
          <Select
            labelId="issue-assignee"
            multiple
            value={filter.assignees}
            label="Assignee"
            input={<OutlinedInput label="Assignee" />}
            onChange={handleChangeAssignees}
          >
            {options.assignees.map((a) => {
              return <MenuItem value={a.id}>{a.name ?? a.username}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "90px" }}>
          <InputLabel id="issue-type">Type</InputLabel>
          <Select
            labelId="issue-type"
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
          <InputLabel id="issue-customer">Customer</InputLabel>
          <Select
            labelId="issue-customer"
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
          <InputLabel id="issue-version">Version</InputLabel>
          <Select
            labelId="issue-version"
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
          <InputLabel id="issue-deal-customer">Deal Customer</InputLabel>
          <Select
            labelId="issue-deal-customer"
            value={filter.isDealCustomer}
            label="Deal Customer"
            onChange={(e) =>
              setFilter({ ...filter, isDealCustomer: e.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.isDealCustomers.map((dc) => {
              return (
                <MenuItem value={dc}>{dc === "true" ? "Yes" : "No"}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "150px" }}>
          <InputLabel id="issue-deal-customer">Is appendix</InputLabel>
          <Select
            labelId="issue-deal-customer"
            value={filter.isAppendix}
            label="Is appendix"
            onChange={(e) =>
              setFilter({ ...filter, isAppendix: e.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.isAppendix.map((ia) => {
              return (
                <MenuItem value={ia}>{ia === "true" ? "Yes" : "No"}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default FilterIssue;
