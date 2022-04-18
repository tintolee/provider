import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { OtherProvidersLoadingDialog } from './otherProviders/other-providers-loading-dialog/OtherProvidersLoadingDialog';
import { OtherProvidersUIProvider } from './OtherProvidersUIContext';
import { OtherProviderCard } from './OtherProvidersCard';

export function OtherProvidersPage({ history }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const opportunityProvidersUIEvents = {
    openDetailOtherProviderPage: (id) => {
      history.push(`/providers-community/${id}/detail`);
    },
  };

  return (
    <OtherProvidersUIProvider
      OtherProvidersUIEvents={opportunityProvidersUIEvents}
      currentProviderId={user.providerId}
    >
      <OtherProvidersLoadingDialog />
      <OtherProviderCard />
    </OtherProvidersUIProvider>
  );
}
