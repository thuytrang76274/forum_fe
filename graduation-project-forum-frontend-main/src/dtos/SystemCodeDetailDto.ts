import { AuditDto } from "./AuditDto";

export interface SystemCodeDetailDto extends AuditDto {
  systemCodeId?: number;
  codeName?: string;
  description?: string;
}
