import { SystemCodeDetailDto, UserDto } from "../dtos";
import DateType from "./DateType";

interface OptionFilterIssue {
  dateType: DateType[];
  statuses: string[];
  assignees: UserDto[];
  types: SystemCodeDetailDto[];
  customers: SystemCodeDetailDto[];
  versions: string[];
  isDealCustomers: string[];
  isAppendix: string[];
}

export default OptionFilterIssue;
