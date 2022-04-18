export const ContentStatusCssClasses = ["danger", "success", ""];
export const ContentStatusTitles = ["Archive", "Active"];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const CONTENT_TYPE = [
  { text: "Photo", value: "Photo" },
  { text: "Blog", value: "Blog" },
  { text: "Video", value: "Video" }
];

export const VISIBILITY = [
  { text: "Public", value: "public" },
  { text: "Seekers Only", value: "seekers_only" },
  { text: "Opportunity Provider Only", value: "op_only" },
  { text: "Private", value: "private" },
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
