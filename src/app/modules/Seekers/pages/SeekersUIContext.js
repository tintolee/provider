import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SeekersUIHelpers";

const SeekersUIContext = createContext();

export function useSeekersUIContext() {
  return useContext(SeekersUIContext);
}

export const SeekersUIConsumer = SeekersUIContext.Consumer;

export function SeekersUIProvider({
  seekersUIEvents,
  currentProviderId,
  children,
}) {
  const [providerId, setProviderId] = useState(currentProviderId);
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
    setProviderId(currentProviderId);
  }, [currentProviderId]);

  const value = {
    ids,
    setIds,
    providerId,
    setProviderId,
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    openRouteMapDetailPage: seekersUIEvents.openRouteMapDetailPage,
  };

  return (
    <SeekersUIContext.Provider value={value}>
      {children}
    </SeekersUIContext.Provider>
  );
}
