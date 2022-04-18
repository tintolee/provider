import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OtherProvidersUIHelpers";

const OtherProviderUIContext = createContext();

export function useOtherProvidersUIContext() {
  return useContext(OtherProviderUIContext);
}

export const OtherProviderUIConsumer = OtherProviderUIContext.Consumer;

export function OtherProvidersUIProvider({ OtherProvidersUIEvents, currentProviderId, children }) {
  const [providerId, setProviderId] = useState(currentProviderId);
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
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

  const initOtherProvider = {
    id: undefined,
    name: "",
    primarySector: "",
    otherSectors: "",
    followers: "",
    content: "",
    opportunities: "",
  };

  const value = {
    providerId,
    setProviderId,
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initOtherProvider,
    openDetailOtherProviderPage: OtherProvidersUIEvents.openDetailOtherProviderPage,
  };

  return <OtherProviderUIContext.Provider value={value}>{children}</OtherProviderUIContext.Provider>;
}