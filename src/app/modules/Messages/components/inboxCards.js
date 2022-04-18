import React from "react";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import styles from "./message.module.scss";
export const InboxCards = () => {
  return (
    <div className="d-flex mt-3 justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src={toAbsoluteUrl("/media/users/users_300.jpg")}
          className="img-rounded rounded-circle mr-4"
          style={{ maxWidth: 50, maxHeight: 50 }}
        />
        <div className="d-flex flex-column justify-content-center">
          <p
            className={`text-bold ${styles.text}`}
            style={{ fontWeight: "bolder" }}
          >
            Tobi Kudayisi
          </p>
          <p className={`text-muted font-weight-bold ${styles.text}`}>
            Head of department
          </p>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center mr-2">
        <p className={` text-muted font-weight-bold ${styles.text}`}>7hrs</p>
        <p className={` ${styles.unread}`}>3</p>
      </div>
    </div>
  );
};
