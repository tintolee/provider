import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import * as actions from "../../_redux/usersActions";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "../UsersUIHelper";
import { useUsersUIContext } from "../UsersUIContext";

export function UsersTable() {
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      providerId: usersUIContext.providerId,
      newUserButtonClick: usersUIContext.newUserButtonClick,
      openEditUserDialog: usersUIContext.openEditUserDialog,
    };
  }, [usersUIContext]);

  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );
  const { entities } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchUsers(usersUIProps.queryParams, usersUIProps.providerId)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersUIProps.queryParams, dispatch, usersUIProps.providerId]);
  const columns = [
    {
      dataField: "firstName",
      text: "First Name",
      sort: false,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: false,
    },
    {
      dataField: "email",
      text: "Email",
      sort: false,
    },
    {
      dataField: "status",
      text: "Status",
      sort: false,
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: usersUIProps.openEditUserDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  return (
    <BootstrapTable
      wrapperClasses="table-responsive"
      classes="table table-head-custom table-vertical-center overflow-hidden"
      bordered={false}
      bootstrap4
      remote
      keyField="id"
      data={entities === null ? [] : entities}
      columns={columns}
      defaultSorted={uiHelpers.defaultSorted}
      onTableChange={getHandlerTableChange(usersUIProps.setQueryParams)}
    >
      <PleaseWaitMessage entities={entities} />
      <NoRecordsFoundMessage entities={entities} />
    </BootstrapTable>
  );
}
