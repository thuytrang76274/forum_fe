import { AuditDto } from "./AuditDto";
import { UserStatus } from "./UserStatus";
import { UserType } from "./UserType";

export interface UserDto extends AuditDto {
  username?: string;
  password?: string;
  name?: string;
  type?: UserType;
  status?: UserStatus;
}
