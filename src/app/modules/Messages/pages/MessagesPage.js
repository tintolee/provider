import React from "react";
import { Link, Redirect, useParams, NavLink } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { MessagesCard } from "../components/MessagesCard";
import { Inbox } from "../components/inbox";
import { Chat } from "../components/chat";

export function MessagesPage() {
  let { selectedChatID } = useParams();
  let messages = [
    { id: "message 1" },
    { id: "message 2" },
    { id: "message 3" },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5 col-lg-5">
          <Inbox />
        </div>
        <div className="col-md-7 col-lg-7">
          <Chat />
        </div>
      </div>
    </div>
  );
}
