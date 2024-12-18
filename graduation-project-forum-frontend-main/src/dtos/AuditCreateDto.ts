import { IdDto } from "./IdDto";

export interface AuditCreateDto extends IdDto {
  createdAt?: string;
  createdBy?: string;
}
