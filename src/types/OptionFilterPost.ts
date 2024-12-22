import DateType from "./DateType";
import { SystemCodeDetailDto, UserDto } from "../dtos";

interface OptionFilterPost {
  dateType: DateType[];
  statuses: string[];
  reporters: UserDto[];
  assignees: UserDto[];
  types: SystemCodeDetailDto[];
  customers: SystemCodeDetailDto[];
  modules: SystemCodeDetailDto[];
  versions: string[];
  isDealCustomers: string[];
}

export default OptionFilterPost;
