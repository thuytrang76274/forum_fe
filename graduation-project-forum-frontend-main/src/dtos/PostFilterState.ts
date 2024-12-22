export interface PostFilterState {
  typeDate: string;
  fromDate: string | null | undefined;
  toDate: string | null | undefined;
  status: string | null | undefined;
  report: string[] | null | undefined;
  assignee: string[] | null | undefined;
  customer: string | null | undefined;
  module: string | null | undefined;
  version: string | null | undefined;
  isDealCustomer: boolean | null | undefined;
}
