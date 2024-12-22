export interface IssueFilterState {
  typeDate: string;
  fromDate: string | null | undefined;
  toDate: string | null | undefined;
  status: string | null | undefined;
  assignee: string[] | null | undefined;
  type: string | null | undefined;
  customer: string | null | undefined;
  version: string | null | undefined;
  isDealCustomer: boolean | null | undefined;
  isAppendix: boolean | null | undefined;
}
