import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { IoStarOutline } from "react-icons/io5";
import { PostDto } from "../dtos";
import { IoIosArrowDown } from "react-icons/io";

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
      <CardHeader avatar={<IoStarOutline />} title="Top discussion today" />
      <CardContent sx={{ paddingX: "0", paddingTop: "0" }}>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Customer
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">TTC AGRIS</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Assignee
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">PDD_ThuyTrang.Nguyen</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Reporter
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">PDD_ThuyTrang.Nguyen</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">Website</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Version
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">2.1.0</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Module
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">Inventory</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Apply for
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">All site</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Due date
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">20/10/2024</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Is appendix
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">Yes</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography fontSize="13px" fontWeight="700">
              Is deal customer
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "0" }}>
            <Typography fontSize="13px">--</Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  </Box>
);

export default PostDetail;
