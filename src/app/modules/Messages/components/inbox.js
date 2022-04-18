import React from "react";
import { MessagesCard } from "./MessagesCard";
import { InboxCards } from "./inboxCards";
import { NavLink } from "react-router-dom";

export const Inbox = ({ dashboard }) => {
  return (
    <MessagesCard>
      <div className="d-flex flex-column w-100">
        {dashboard ? (
          <NavLink to="/messages">
            <h3 className="card-title font-weight-bolder text-dark text-hover-primary">
              Inbox
            </h3>
          </NavLink>
        ) : (
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Seeker"
              type="email"
              className="form-control form-control-solid h-auto py-4 px-3"
              name="email"
            />
          </div>
        )}

        <div className="mt-1 overflow-auto h-sm-475px">
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
          <InboxCards />
        </div>
      </div>
    </MessagesCard>
  );
};
