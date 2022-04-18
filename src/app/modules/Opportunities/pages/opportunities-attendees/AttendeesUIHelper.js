export const AttendeeStatusCssClasses2 = {
  UNREGISTERED: "danger",
  REGISTERED: "success",
  INVITED: "warning",
  APPLIED: "primary",
};
export const AttendeeStatusCssClasses = [
  "danger",
  "success",
  "warning",
  "primary",
];
export const AttendeeStatusTitles = [
  "UNREGISTERED",
  "REGISTERED",
  "INVITED",
  "APPLIED",
];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: null,
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 5,
};
