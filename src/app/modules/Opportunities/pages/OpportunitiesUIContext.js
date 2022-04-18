import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OpportunitiesUIHelpers";

const OpportunitiesUIContext = createContext();

export function useOpportunitiesUIContext() {
  return useContext(OpportunitiesUIContext);
}

export const OpportunitiesUIConsumer = OpportunitiesUIContext.Consumer;

export function OpportunitiesUIProvider({
  opportunitiesUIEvents,
  currentProviderId,
  children,
}) {
  const [providerId, setProviderId] = useState(currentProviderId);
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
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
    setProviderId(currentProviderId);
  }, [currentProviderId]);

  const value = {
    providerId,
    setProviderId,
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    newOpportunityButtonClick: opportunitiesUIEvents.newOpportunityButtonClick,
    openEditOpportunityPage: opportunitiesUIEvents.openEditOpportunityPage,
    openUpdateOpportunityStatusDialog:
      opportunitiesUIEvents.openUpdateOpportunityStatusDialog,
  };

  return (
    <OpportunitiesUIContext.Provider value={value}>
      {children}
    </OpportunitiesUIContext.Provider>
  );
}
