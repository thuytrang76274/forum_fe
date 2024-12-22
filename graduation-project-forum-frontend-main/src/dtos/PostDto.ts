import { ApplyFor } from "./ApplyFor";
import { AuditDto } from "./AuditDto";
import { CommentDto } from "./CommentDto";
import { IssueDto } from "./IssueDto";
import { PostStatus } from "./PostStatus";
import { SystemCodeDetailDto } from "./SystemCodeDetailDto";

export interface PostDto extends AuditDto {
  title?: string;
  description?: string;
  applyFor?: ApplyFor;
  approvedAt?: string; // LocalDateTime được chuyển thành string (ISO 8601 format)
  status?: PostStatus;
  issue?: IssueDto;
  module?: SystemCodeDetailDto;
  customer?: SystemCodeDetailDto;
  comments?: CommentDto[];
}
