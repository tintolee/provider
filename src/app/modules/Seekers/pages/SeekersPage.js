import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { SeekersLoadingDialog } from "./seekers-loading-dialog/SeekersLoadingDialog";
import { SeekersList } from "./seekers-list/SeekersList";
import { SeekersUIProvider } from "./SeekersUIContext";

export function SeekersPage({ history }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const seekersUIEvents = {
    openRouteMapDetailPage: (seekerId, routemapId) => {
      history.push(`/followers/${seekerId}/route-map/${routemapId}`);
    },
  };

  return (
    <SeekersUIProvider
      seekersUIEvents={seekersUIEvents}
      currentProviderId={user.providerId}
    >
      <SeekersLoadingDialog />
      <SeekersList />
    </SeekersUIProvider>
  );
}
