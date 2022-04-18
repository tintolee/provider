export const OpportunityStatusCssClasses = ["danger", "success", ""];
export const OpportunityStatusTitles = ["Archive", "Active"];
export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const APPLICATIONREQUIRED = [
  { text: "Yes", value: true },
  { text: "No", value: false },
];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: null,
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10,
};
