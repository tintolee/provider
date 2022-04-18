import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UsersUIHelper";

const UsersUIContext = createContext();

export function useUsersUIContext() {
  return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({
  usersUIEvents,
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

  const initUser = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    status: 1,
    opportunityProviderUserOpportunityProviderId: providerId,
  };
  useEffect(() => {
    initUser.opportunityProviderUserOpportunityProviderId = currentProviderId;
    setProviderId(currentProviderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProviderId]);

  const value = {
    providerId,
    setProviderId,
    queryParams,
    setQueryParams,
    initUser,
    newUserButtonClick: usersUIEvents.newUserButtonClick,
    openEditUserDialog: usersUIEvents.openEditUserDialog,
    showEditUserDialog: usersUIEvents.showEditUserDialog,
    closeEditUserDialog: usersUIEvents.closeEditUserDialog,
  };

  return (
    <UsersUIContext.Provider value={value}>{children}</UsersUIContext.Provider>
  );
}
