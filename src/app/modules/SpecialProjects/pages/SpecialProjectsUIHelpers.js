export const SpecialProjectStatusCssClasses = ["danger", "success", ""];
export const SpecialProjectStatusTitles = ["Archive", "Active"];
export const defaultSorted = [{ dataField: "id", order: "asc" }];

export const EMPLOYEE_COUNT = [
  { text: "1-10", value: "1-10" },
  { text: "11-50", value: "11-50" },
  { text: "51-250", value: "51-250" },
  { text: "251+", value: "251+" },
];

export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "50", value: 50 },
];
//Filter for GraphQL query
export const initialFilter = {
  filter: null,
  sortOrder: "asc", // asc||desc
  sortField: "title",
  pageNumber: 1,
  pageSize: 10,
};
