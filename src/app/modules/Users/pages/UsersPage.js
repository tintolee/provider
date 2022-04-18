import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { UsersLoadingDialog } from './users-loading-dialog/UsersLoadingDialog';
import { UserEditDialog } from './users-edit-dialog/UserEditDialog';
import { UsersCard } from './UsersCard';
import { UsersUIProvider } from './UsersUIContext';

export function UsersPage({ history }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push('/users/new');
    },
    openEditUserDialog: (id) => {
      history.push(`/users/${id}/edit`);
    },
  };

  return (
    <UsersUIProvider
      usersUIEvents={usersUIEvents}
      currentProviderId={user.providerId}
    >
      <UsersLoadingDialog />
      <Route path='/users/new'>
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            onHide={() => {
              history.push('/users');
            }}
          />
        )}
      </Route>
      <Route path='/users/:id/edit'>
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/users');
            }}
          />
        )}
      </Route>
      <UsersCard />
    </UsersUIProvider>
  );
}
