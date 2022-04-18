import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../_redux/opportunities/opportunitiesActions';
import * as uiHelpers from '../OpportunitiesUIHelpers';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  headerSortingClasses,
} from '../../../../../_metronic/_helpers';
import { ActionsColumnFormatter } from './column-formatters/ActionsColumnFormatter';
import { StatusColumnFormatter } from './column-formatters/StatusColumnFormatter';
import { DateColumnFormatter } from './column-formatters/DateColumnFormatter';
import { TitleColumnFormatter } from './column-formatters/TitleColumnFormatter';
import { AttendeesColumnFormatter } from './column-formatters/AttendeesColumnFormatter';
import { Pagination } from '../../../../../_metronic/_partials/controls';
import { useOpportunitiesUIContext } from '../OpportunitiesUIContext';

export function OpportunitiesTable() {
  const opportunitiesUIContext = useOpportunitiesUIContext();
  const opportunitiesUIProps = useMemo(() => {
    return {
      providerId: opportunitiesUIContext.providerId,
      queryParams: opportunitiesUIContext.queryParams,
      setQueryParams: opportunitiesUIContext.setQueryParams,
      newOpportunityButtonClick:
        opportunitiesUIContext.newOpportunityButtonClick,
      openEditOpportunityPage: opportunitiesUIContext.openEditOpportunityPage,
      openUpdateOpportunityStatusDialog:
        opportunitiesUIContext.openUpdateOpportunityStatusDialog,
    };
  }, [opportunitiesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.opportunities }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(
      actions.fetchOpportunities(
        opportunitiesUIProps.queryParams,
        opportunitiesUIProps.providerId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunitiesUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: 'title',
      text: 'Title',
      formatter: TitleColumnFormatter,
      formatExtraData: {
        openEditOpportunityPage: opportunitiesUIProps.openEditOpportunityPage,
      },
    },
    {
      dataField: 'opportunityType',
      text: 'Opportunity Type',
      sort: false,
      formatter: (opportunityType) => (
        <>
          <span className={`font-bold font`}>{opportunityType.name} </span>
        </>
      ),
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: false,
      formatter: DateColumnFormatter,
    },
    {
      dataField: 'applicationDeadline',
      text: 'Deadline',
      sort: false,
      formatter: DateColumnFormatter,
    },
    {
      dataField: 'applicationRequired',
      text: 'Application Required',
      sort: false,
      formatter: (applicationRequired) => (
        <>
          <span className={`font-bold font`}>
            {
              uiHelpers.APPLICATIONREQUIRED.find(
                (item) => item.value === applicationRequired
              ).text
            }{' '}
          </span>
        </>
      ),
    },
    {
      dataField: 'location',
      text: 'Location',
      sort: false,
    },
    {
      dataField: 'attendees.items.length',
      text: 'Attendees',
      sort: false,
      formatter: AttendeesColumnFormatter,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditOpportunityPage: opportunitiesUIProps.openEditOpportunityPage,
        openUpdateOpportunityStatusDialog:
          opportunitiesUIProps.openUpdateOpportunityStatusDialog,
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: opportunitiesUIProps.queryParams.pageSize,
    page: opportunitiesUIProps.queryParams.pageNumber,
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
                wrapperClasses='table-responsive'
                classes='table table-head-custom table-vertical-center overflow-hidden'
                bootstrap4
                bordered={false}
                remote
                keyField='id'
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  opportunitiesUIProps.setQueryParams
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
