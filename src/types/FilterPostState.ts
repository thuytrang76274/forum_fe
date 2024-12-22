import { Dayjs } from "dayjs";

interface FilterPostState {
  dateType: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  status?: string;
  reporters: string[];
  assignees: string[];
  type?: string;
  customer?: string;
  module?: string;
  version?: string;
  isDealCustomer?: string;
}

export default FilterPostState;
