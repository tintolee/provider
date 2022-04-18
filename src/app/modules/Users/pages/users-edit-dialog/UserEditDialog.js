import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/usersActions";
import { UserEditDialogHeader } from "./UserEditDialogHeader";
import { UserEditForm } from "./UserEditForm";
import { useUsersUIContext } from "../UsersUIContext";

export function UserEditDialog({ id, show, onHide }) {
  // ProviderUsers UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      providerId: usersUIContext.providerId,
      queryParams: usersUIContext.queryParams,
      initUser: usersUIContext.initUser,
    };
  }, [usersUIContext]);

  // ProviderUsers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, userForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server request for getting ProviderUser by seleted id
    dispatch(actions.fetchUser(id));
  }, [id, dispatch]);

  const saveUser = (user) => {
    if (!id) {
      dispatch(actions.createUser(user)).then(() => {
        dispatch(
          actions.fetchUsers(usersUIProps.queryParams, usersUIProps.providerId)
        ).then(() => {
          onHide();
        });
      });
    } else {
      // server request for updating ProviderUsers
      const input = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        opportunityProviderUserOpportunityProviderId: usersUIProps.providerId,
      };

      dispatch(actions.updateUser(input)).then(() => {
        dispatch(
          actions.fetchUsers(usersUIProps.queryParams, usersUIProps.providerId)
        ).then(() => {
          onHide();
        });
      });
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserEditDialogHeader id={id} />
      <UserEditForm
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
      />
    </Modal>
  );
}
