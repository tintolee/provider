/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OpportunitiesUIHelper";

const OpportunitiesUIContext = createContext();

export function useOpportunitiesUIContext() {
  return useContext(OpportunitiesUIContext);
}

export const OpportunitiesUIConsumer = OpportunitiesUIContext.Consumer;

export function OpportunitiesUIProvider({ currentOpportunityProviderId, children }) {
  const [opportunityProviderId, setOpportunityProviderId] = useState(currentOpportunityProviderId);
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  useEffect(() => {
    setOpportunityProviderId(currentOpportunityProviderId);
  }, [currentOpportunityProviderId]);

  const value = {
    ids,
    setIds,
    opportunityProviderId,
    setOpportunityProviderId,
    queryParams,
    setQueryParams
  };

  return (
    <OpportunitiesUIContext.Provider value={value}>
      {children}
    </OpportunitiesUIContext.Provider>
  );
}
