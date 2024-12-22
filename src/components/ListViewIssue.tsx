import { Box, CircularProgress, Stack } from "@mui/material";
import ItemViewIssue from "./ItemViewIssue";
import { IssueDto } from "../dtos";

const ListViewIssue = ({
  issues,
  loading,
}: {
  issues: IssueDto[];
  loading: boolean;
}) => {
  return (
    <Stack marginTop="45px" spacing="45px">
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        issues.map((issue) => <ItemViewIssue issue={issue} />)
      )}
    </Stack>
  );
};

export default ListViewIssue;
