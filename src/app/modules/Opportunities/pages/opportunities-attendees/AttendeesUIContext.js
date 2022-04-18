/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AttendeesUIHelper";

const AttendeesUIContext = createContext();

export function useAttendeesUIContext() {
  return useContext(AttendeesUIContext);
}

export const AttendeesUIConsumer = AttendeesUIContext.Consumer;

export function AttendeesUIProvider({ currentOpportunityId, children }) {
  const [opportunityId, setOpportunityId] = useState(currentOpportunityId);
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
    setOpportunityId(currentOpportunityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOpportunityId]);

  const [
    showUpdateAttendeesStatusDialog,
    setShowUpdateAttendeesStatusDialog,
  ] = useState(false);
  const openUpdateAttendeesStatusDialog = () => {
    setShowUpdateAttendeesStatusDialog(true);
  };
  const closeUpdateAttendeesStatusDialog = () => {
    setShowUpdateAttendeesStatusDialog(false);
  };

  const value = {
    ids,
    setIds,
    opportunityId,
    setOpportunityId,
    queryParams,
    setQueryParams,
    showUpdateAttendeesStatusDialog,
    openUpdateAttendeesStatusDialog,
    closeUpdateAttendeesStatusDialog,
  };

  return (
    <AttendeesUIContext.Provider value={value}>
      {children}
    </AttendeesUIContext.Provider>
  );
}
