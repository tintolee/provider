import React, { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../_metronic/_partials/controls';
import { OpportunitiesFilter } from './opportunities-filter/OpportunitiesFilter';
import { OpportunitiesTable } from './opportunities-table/OpportunitiesTable';
import { useOpportunitiesUIContext } from './OpportunitiesUIContext';

export function OpportunitiesCard() {
  const opportunitiesUIContext = useOpportunitiesUIContext();
  const opportunitiesUIProps = useMemo(() => {
    return {
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

  const { entities, listLoading } = currentState;

  return (
    <Card>
      <CardHeader title='Opportunities'>
        <CardHeaderToolbar>
          <button
            type='button'
            className='btn btn-primary'
            onClick={opportunitiesUIProps.newOpportunityButtonClick}
          >
            New Opportunity
          </button>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        {listLoading ? <div></div> : <OpportunitiesFilter />}
        {/* <OpportunitiesTable /> */}
      </CardBody>
    </Card>
  );
}
