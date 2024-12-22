import { AuditCreateDto } from "./AuditCreateDto";
import { ImageDto } from "./ImageDto";
import { SystemCodeDetailDto } from "./SystemCodeDetailDto";
import { UserDto } from "./UserDto";

export interface IssueDto extends AuditCreateDto {
  content?: string;
  penpotCommentId?: string;
  penpotPrototypeLink?: string;
  dueDate?: string;
  status?: string;
  version?: string;
  isAppendix?: boolean;
  isDealCustomer?: boolean;
  image?: ImageDto;
  type?: SystemCodeDetailDto;
  customer?: SystemCodeDetailDto;
  assignees?: UserDto[];
  numberOfPosts?: number;
}
