import { IdDto } from "./IdDto";

export interface AuditDto extends IdDto {
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}
