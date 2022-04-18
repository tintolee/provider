import { API, graphqlOperation } from "aws-amplify";
import { listOpportunityTypes } from "../../../../../graphql/queries";

export function getAllOpportunityTypes(queryParams) {
  return API.graphql(graphqlOperation(listOpportunityTypes, {}));
}
