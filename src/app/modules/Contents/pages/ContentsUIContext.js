import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ContentsUIHelpers";

const ContentsUIContext = createContext();

export function useContentsUIContext() {
    return useContext(ContentsUIContext);
}

export function ContentsUIProvider({ contentsUIEvents, currentProviderId, children }) {
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
        newContentButtonClick: contentsUIEvents.newContentButtonClick,
        openEditContentPage: contentsUIEvents.openEditContentPage,
        openFetchContentsDialog: contentsUIEvents.openFetchContentsDialog,
        openUpdateContentStatusDialog: contentsUIEvents.openUpdateContentStatusDialog,
    };

    return (
        <ContentsUIContext.Provider value={value}>
            {children}
        </ContentsUIContext.Provider>
    );
}
