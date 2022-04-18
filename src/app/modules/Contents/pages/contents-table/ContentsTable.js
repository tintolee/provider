import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/contentsActions";
import * as uiHelpers from "../ContentsUIHelpers";
// import moment from 'moment';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses
} from "../../../../../_metronic/_helpers";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { TitleColumnFormatter } from "./column-formatters/TitleColumnFormatter";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useContentsUIContext } from "../ContentsUIContext";

export function ContentsTable() {
  const contentsUIContext = useContentsUIContext();
  const contentsUIProps = useMemo(() => {
    return {
      providerId: contentsUIContext.providerId,
      ids: contentsUIContext.ids,
      setIds: contentsUIContext.setIds,
      queryParams: contentsUIContext.queryParams,
      setQueryParams: contentsUIContext.setQueryParams,
      openEditContentPage: contentsUIContext.openEditContentPage,
      openUpdateContentStatusDialog: contentsUIContext.openUpdateContentStatusDialog
    };
  }, [contentsUIContext]);

  // Getting curret state of contents list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.contents }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchContents(contentsUIProps.queryParams, contentsUIProps.providerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentsUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: false,
      formatter: TitleColumnFormatter,
      formatExtraData: {
        openEditContentPage: contentsUIProps.openEditContentPage,
      },
    },
    {
      dataField: "createdAt",
      text: "Date Created",
      sort: false,
      formatter: DateColumnFormatter,
    },
    {
      dataField: "type",
      text: "Type",
      sort: false
    },
    {
      dataField: "positiveFeedbacks.items.length",
      text: "Feedbacks",
      sort: false
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditContentPage: contentsUIProps.openEditContentPage,
        openUpdateContentStatusDialog: contentsUIProps.openUpdateContentStatusDialog
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: contentsUIProps.queryParams.pageSize,
    page: contentsUIProps.queryParams.pageNumber,
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
                  contentsUIProps.setQueryParams
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