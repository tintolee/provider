import React from "react";
import { MessagesCard } from "./MessagesCard";
import { Link, Redirect, useParams, NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ReceivedMsg } from "./receivedMessage";
import { SentdMsg } from "./sentMessage";
import styles from "./message.module.scss";

export const Chat = () => {
  let { selectedChatID } = useParams();
  return (
    <MessagesCard>
      <div className="w-100">
        <div className="d-flex justify-content-between ">
          <NavLink className="btn" to="/messages">
            <span className={`svg-icon svg-icon `}>
              <SVG src={toAbsoluteUrl("/media/svg/esoft/ellipsis.svg")} />
            </span>
          </NavLink>
          <div className="text-center">
            <div className="text-center">
              <p style={{ lineHeight: "0.7" }} className="text-bold">
                Tobi Kudayisi
              </p>
            </div>
            <p style={{ lineHeight: "0.5" }}>Active</p>
          </div>
          <NavLink className="button" to="/messages">
            <span className="mr-4">
              <span className={`svg-icon svg-icon pl-5`}>
                <SVG src={toAbsoluteUrl("/media/svg/esoft/user-plus.svg")} />
              </span>
            </span>
          </NavLink>
        </div>
        <div className="separator separator-solid" />
        <div
          style={{ maxHeight: "235px" }}
          className="d-flex flex-column mt-1 overflow-auto pb-3 pr-3"
        >
          <ReceivedMsg />
          <SentdMsg />
          <ReceivedMsg />
          <SentdMsg />
        </div>
        <div className="separator separator-solid" />
        <div className="w-100">
          <textarea className={styles.textAreaInput}></textarea>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div d-flex align-items-center>
            <span className={`svg-icon mr-5 `}>
              <SVG src={toAbsoluteUrl("/media/svg/esoft/image.svg")} />
            </span>
            <span className={`svg-icon `}>
              <SVG src={toAbsoluteUrl("/media/svg/esoft/camera.svg")} />
            </span>
          </div>
          <button className="btn btn-primary">send</button>
        </div>
      </div>
    </MessagesCard>
  );
};
