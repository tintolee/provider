import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import OpportunitiesLists from './opportunities-card-list/OpportunitiesLists';
import { OpportunitiesLoadingDialog } from './opportunities-loading-dialog/OpportunitiesLoadingDialog';
import { OpportunitiesCard } from './OpportunitiesCard';
import { OpportunitiesUIProvider } from './OpportunitiesUIContext';

export function OpportunitiesPage({ history }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const opportunitiesUIEvents = {
    newOpportunityButtonClick: () => {
      history.push('/opportunities/new');
    },
    openEditOpportunityPage: (id) => {
      history.push(`/opportunities/${id}/edit`);
    },
    openUpdateProviderStatusDialog: (id) => {
      history.push(`/opportunities/${id}/updateStatus`);
    },
  };

  return (
    <OpportunitiesUIProvider
      opportunitiesUIEvents={opportunitiesUIEvents}
      currentProviderId={user.providerId}
    >
      {/* <OpportunitiesLoadingDialog /> */}
      <OpportunitiesCard />
      <OpportunitiesLists />
    </OpportunitiesUIProvider>
  );
}
