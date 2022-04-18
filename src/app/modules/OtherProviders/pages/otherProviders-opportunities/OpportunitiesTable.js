import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import * as actions from "../../../Opportunities/_redux/opportunities/opportunitiesActions";
import * as uiHelpers from "./OpportunitiesUIHelper";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage
} from "../../../../../_metronic/_helpers";
import { useOpportunitiesUIContext } from "./OpportunitiesUIContext";

export function OpportunitiesTable() {
  const opportuntiesUIContext = useOpportunitiesUIContext();
  const opportunitiesUIProps = useMemo(() => {
    return {
      ids: opportuntiesUIContext.ids,
      setIds: opportuntiesUIContext.setIds,
      queryParams: opportuntiesUIContext.queryParams,
      setQueryParams: opportuntiesUIContext.setQueryParams,
      opportunityProviderId: opportuntiesUIContext.opportunityProviderId,
    };
  }, [opportuntiesUIContext]);

  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.opportunities }),
    shallowEqual
  );
  const { entities } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchOpportunities(
        opportunitiesUIProps.queryParams,
        opportunitiesUIProps.opportunityProviderId
      )
    );
  }, [opportunitiesUIProps, opportunitiesUIProps.queryParams, dispatch, opportunitiesUIProps.opportunityProviderId]);
  const columns = [
    {
      dataField: "title",
      text: "Name",
      sort: false
    },
    {
      dataField: "opportunityType",
      text: "Opportunity Type",
      sort: false,
      formatter: (opportunityType) => (
        <>
          <span className={`font-bold font`}>
            {opportunityType.name}
          </span>
        </>
      ),
    },
    {
      dataField: "location",
      text: "Location",
    },
    {
      dataField: "attendees.items.length",
      text: "Applied/Registered",
    },
    {
      dataField: "opportunityCreatedSteps.items.length",
      text: "Step Created",
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
      onTableChange={getHandlerTableChange(opportunitiesUIProps.setQueryParams)}
    >
      <PleaseWaitMessage entities={entities} />
      <NoRecordsFoundMessage entities={entities} />
    </BootstrapTable>
  );
}
