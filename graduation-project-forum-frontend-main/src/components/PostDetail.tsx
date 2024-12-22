import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { IoStarOutline } from "react-icons/io5";
import { PostDto } from "../dtos";

const PostDetail = ({ post }: { post: PostDto | undefined }) => (
  <Box
    width="277px"
    marginTop="40px"
    sx={{
      height: `calc(100vh - 84px - 40px)`,
      overflowY: "scroll",
      overflowX: "hidden",
    }}
  >
    <Card>
      <CardHeader avatar={<IoStarOutline />} title="Details" />
      <CardContent sx={{ paddingTop: "0" }}>
        <Stack spacing="10px">
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Customer
            </Typography>
            <Typography fontSize="13px">TTC AGRIS</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Assignee
            </Typography>
            <Typography fontSize="13px">PDD_ThuyTrang.Nguyen</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Reporter
            </Typography>
            <Typography fontSize="13px">PDD_ThuyTrang.Nguyen</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Type
            </Typography>
            <Typography fontSize="13px">Website</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Version
            </Typography>
            <Typography fontSize="13px">2.1.0</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Module
            </Typography>
            <Typography fontSize="13px">Inventory</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Apply for
            </Typography>
            <Typography fontSize="13px">All site</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Due date
            </Typography>
            <Typography fontSize="13px">20/10/2024</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Is appendix
            </Typography>
            <Typography fontSize="13px">Yes</Typography>
          </Box>
          <Box>
            <Typography fontSize="13px" fontWeight="700">
              Is deal customer
            </Typography>
            <Typography fontSize="13px">--</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default PostDetail;
