import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SpecialProjectsUIHelpers";

const SpecialProjectsUIContext = createContext();

export function useSpecialProjectsUIContext() {
    return useContext(SpecialProjectsUIContext);
}

export function SpecialProjectsUIProvider({ specialProjectsUIEvents, currentProviderId, children }) {
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
        providerId,
        setProviderId,
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        newSpecialProjectButtonClick: specialProjectsUIEvents.newSpecialProjectButtonClick,
    };

    return (
        <SpecialProjectsUIContext.Provider value={value}>
            {children}
        </SpecialProjectsUIContext.Provider>
    );
}
