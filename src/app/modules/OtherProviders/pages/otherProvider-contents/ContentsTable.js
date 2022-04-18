import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import * as actions from "../../../Contents/_redux/contentsActions";
import * as uiHelpers from "./ContentsUIHelper";
// import moment from 'moment';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage
} from "../../../../../_metronic/_helpers";
import { useContentsUIContext } from "./ContentsUIContext";

export function ContentsTable() {
  const contentsUIContext = useContentsUIContext();
  const contentsUIProps = useMemo(() => {
    return {
      ids: contentsUIContext.ids,
      setIds: contentsUIContext.setIds,
      queryParams: contentsUIContext.queryParams,
      setQueryParams: contentsUIContext.setQueryParams,
      opportunityProviderId: contentsUIContext.opportunityProviderId,
    };
  }, [contentsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.contents }),
    shallowEqual
  );
  const { entities } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchContents(
        contentsUIProps.queryParams,
        contentsUIProps.opportunityProviderId
      )
    );
  }, [contentsUIProps, contentsUIProps.queryParams, dispatch, contentsUIProps.opportunityProviderId]);
  const columns = [
    {
      dataField: "createdAt",
      text: "Date Created",
      sort: false,
      formatter: (createdAt) => (
        <>
          {/* <Moment format="YYYY/MM/DD"> */}
            {createdAt}
          {/* </Moment> */}
        </>
      )
    },
    {
      dataField: "title",
      text: "Title",
      sort: false
    },
    {
      dataField: "type",
      text: "Type of Content",
      sort: false
    },
    {
      dataField: "positiveFeedbacks.items.length",
      text: "Positive Feedbacks",
      sort: false
    }
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
      onTableChange={getHandlerTableChange(contentsUIProps.setQueryParams)}
    >
      <PleaseWaitMessage entities={entities} />
      <NoRecordsFoundMessage entities={entities} />
    </BootstrapTable>
  );
}
