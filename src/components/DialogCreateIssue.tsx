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
} from "@mui/material";
import dayjs from "dayjs";
import { IoStarOutline } from "react-icons/io5";
import { useAppStore } from "../hooks";
import { DatePicker } from "@mui/x-date-pickers";

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
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { state } = useAppStore();

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
                Upload image to describe the current issue
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(event) => console.log(event.target.files)}
                />
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ width: "277px" }}>
            <CardHeader avatar={<IoStarOutline />} title="Details" />
            <CardContent sx={{ paddingTop: "0px" }}>
              <Stack spacing="10px">
                <FormControl size="small" fullWidth required>
                  <InputLabel id="customer-label">Customer</InputLabel>
                  <Select
                    value={""}
                    id="customer-label"
                    label="Status"
                    onChange={(e) => {}}
                  >
                    {/* {options.status.map((o) => (
                    <MenuItem key={o} value={o}>
                      <Typography fontSize="13px">{o}</Typography>
                    </MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel id="assignee-label">Assignee</InputLabel>
                  <Select
                    value={""}
                    id="assignee-label"
                    label="Status"
                    multiple
                    onChange={(e) => {}}
                  >
                    {/* {options.status.map((o) => (
                    <MenuItem key={o} value={o}>
                      <Typography fontSize="13px">{o}</Typography>
                    </MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth required>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    value={""}
                    id="type-label"
                    label="Status"
                    onChange={(e) => {}}
                  >
                    {/* {options.status.map((o) => (
                    <MenuItem key={o} value={o}>
                      <Typography fontSize="13px">{o}</Typography>
                    </MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
                <TextField size="small" label="Version" />
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  label="Due date"
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
          onClick={() => {}}
        >
          <Typography
            fontSize="13px"
            color="white"
            sx={{ textTransform: "none" }}
          >
            Create issue
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
