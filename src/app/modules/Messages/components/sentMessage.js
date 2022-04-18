import React from "react";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import styles from "./message.module.scss";

export const SentdMsg = () => {
  return (
    <div>
      <div className="d-flex mt-2 flex-row-reverse text-end">
        <img
          src={toAbsoluteUrl("/media/users/users_300.jpg")}
          className="img-rounded rounded-circle mr-5 mx-1"
          style={{ maxWidth: 50, maxHeight: 50 }}
        />
        <p className="text-bold mt-5 mx-1" style={{ fontWeight: "bolder" }}>
          Matt Pears
        </p>
        <p className="ml-3 mt-5 text-muted font-weight-bold mx-2">2 Hours ago</p>
      </div>
      <div className={styles.sentMsg}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
        </p>
      </div>
    </div>
  );
};
