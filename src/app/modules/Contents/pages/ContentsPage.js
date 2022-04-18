import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Route } from 'react-router-dom';
import { ContentsLoadingDialog } from './contents-loading-dialog/ContentsLoadingDialog';
import { ContentsCard } from './ContentsCard';
import { ContentUpdateStatusDialog } from './contents-update-status-dialog/ContentUpdateStatusDialog';
import { ContentsUIProvider } from './ContentsUIContext';
import ContentsLists from './contents-card-list/ContentsLists';

export function ContentsPage({ history }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const contentsUIEvents = {
    newContentButtonClick: () => {
      history.push('/contents/new');
    },
    openEditContentPage: (id) => {
      history.push(`/contents/${id}/edit`);
    },
    openUpdateContentStatusDialog: (id) => {
      history.push(`/contents/${id}/updateStatus`);
    },
  };

  return (
    <ContentsUIProvider
      contentsUIEvents={contentsUIEvents}
      currentProviderId={user.providerId}
    >
      <ContentsLoadingDialog />
      <Route path='/contents/:id/updateStatus'>
        {({ history, match }) => (
          <ContentUpdateStatusDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/contents');
            }}
          />
        )}
      </Route>
      <ContentsCard />
      <ContentsLists />
    </ContentsUIProvider>
  );
}
