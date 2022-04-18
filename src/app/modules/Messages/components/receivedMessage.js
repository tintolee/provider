import React from "react";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import styles from "./message.module.scss";

export const ReceivedMsg = () => {
  return (
    <div>
      <div className="d-flex mt-2">
        <img
          src={toAbsoluteUrl("/media/users/users_300.jpg")}
          className="img-rounded rounded-circle mr-5"
          style={{ maxWidth: 50, maxHeight: 50 }}
        />
        <p className="text-bold mt-5" style={{ fontWeight: "bolder" }}>
          Matt Pears
        </p>
        <p className="ml-3 mt-5 text-muted font-weight-bold">2 Hours ago</p>
      </div>
      <div className={styles.receivedMsg}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          scelerisque lectus, tempus lacinia nisl. Donec vel elementum .
        </p>
      </div>
    </div>
  );
};
