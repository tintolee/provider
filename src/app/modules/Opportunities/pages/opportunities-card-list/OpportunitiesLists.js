import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../_redux/opportunities/opportunitiesActions';
import { useOpportunitiesUIContext } from '../OpportunitiesUIContext';
import OpportunitiesCard from './OpportunitiesCard';

const OpportunitiesLists = () => {
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

  const { entities, listLoading } = currentState;

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

  return (
    <div className='row'>
      <OpportunitiesCard listLoading={listLoading} entities={entities} />
    </div>
  );
};

export default OpportunitiesLists;
