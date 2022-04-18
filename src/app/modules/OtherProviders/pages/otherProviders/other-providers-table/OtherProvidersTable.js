import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/otherProviders/otherProvidersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../OtherProvidersUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useOtherProvidersUIContext } from "../../OtherProvidersUIContext";
import { NameColumnFormatter } from "./column-formatters/NameColumnFormatter";

export function OtherProvidersTable() {
  // OtherProviders UI Context
  const opportunityProvidersUIContext = useOtherProvidersUIContext();
  const opportunityProvidersUIProps = useMemo(() => {
    return {
      ids: opportunityProvidersUIContext.ids,
      providerId: opportunityProvidersUIContext.providerId,
      setIds: opportunityProvidersUIContext.setIds,
      queryParams: opportunityProvidersUIContext.queryParams,
      setQueryParams: opportunityProvidersUIContext.setQueryParams,
      openDetailOtherProviderPage: opportunityProvidersUIContext.openDetailOtherProviderPage,
    };
  }, [opportunityProvidersUIContext]);

  // Getting current state of opportunityProviders list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.opportunityProviders }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  // opportunityProvidersRedux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchOpportunityProviders(opportunityProvidersUIProps.queryParams, opportunityProvidersUIProps.providerId));
  }, [opportunityProvidersUIProps.queryParams, opportunityProvidersUIProps.providerId, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      formatter: NameColumnFormatter ,
      formatExtraData: {
        openDetailOtherProviderPage: opportunityProvidersUIProps.openDetailOtherProviderPage
      }
    },
    {
      dataField: "primarySector.name",
      text: "Primary Sector",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      //todo : other sector values update
      dataField: "secondarySector",
      text: "Other Sectors",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "followers.items.length",
      text: "Followers",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "contents.items.length",
      text: "Contents",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "opportunities.items.length",
      text: "Opportunities",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: opportunityProvidersUIProps.queryParams.pageSize,
    page: opportunityProvidersUIProps.queryParams.pageNumber,
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
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  opportunityProvidersUIProps.setQueryParams
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
