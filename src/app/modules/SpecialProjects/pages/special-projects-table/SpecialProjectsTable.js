import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/specialProjectActions";
import * as uiHelpers from "../SpecialProjectsUIHelpers";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  headerSortingClasses
} from "../../../../../_metronic/_helpers";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useSpecialProjectsUIContext } from "../SpecialProjectsUIContext";

export function SpecialProjectsTable() {
  const specialprojectsUIContext = useSpecialProjectsUIContext();
  const specialprojectsUIProps = useMemo(() => {
    return {
      providerId: specialprojectsUIContext.providerId,
      ids: specialprojectsUIContext.ids,
      setIds: specialprojectsUIContext.setIds,
      queryParams: specialprojectsUIContext.queryParams,
      setQueryParams: specialprojectsUIContext.setQueryParams
    };
  }, [specialprojectsUIContext]);

  // Getting curret state of special project list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.specialProjects }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchSpecialProjects(specialprojectsUIProps.queryParams, specialprojectsUIProps.providerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialprojectsUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    // {
    //   dataField: "opportunityType.name",
    //   text: "Opportunity Type",
    // },
    {
      dataField: "contactName",
      text: "Contact name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "telephoneNumber",
      text: "Telephone No.",
    },
    {
      dataField: "mobileNumber",
      text: "Mobile No.",
    },
    {
      dataField: "primarySector.name",
      text: "primary Sector",
    },
    {
      dataField: "employeeCount",
      text: "No.Of.Employees",
    },
    {
      dataField: "projectSummary",
      text: "Description",
    },
    {
      dataField: "status",
      text: "Status",
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: specialprojectsUIProps.queryParams.pageSize,
    page: specialprojectsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  specialprojectsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}