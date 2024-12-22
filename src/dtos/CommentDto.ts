import { AuditDto } from "./AuditDto";
import { PostDto } from "./PostDto";

export interface CommentDto extends AuditDto {
  content?: string;
  vote?: number;
  isSolution?: boolean;
  post?: PostDto;
}
