import { Dayjs } from "dayjs";

interface FilterIssueState {
  dateType: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  status?: string;
  assignees: string[];
  type?: string;
  customer?: string;
  version?: string;
  isDealCustomer?: string;
  isAppendix?: string;
}

export default FilterIssueState;
