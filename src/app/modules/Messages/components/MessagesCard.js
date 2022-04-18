/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import moment from "moment";
import { Storage } from "aws-amplify";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export function MessagesCard(props) {
  const [imageSource, setImageSource] = useState("");

  /*
  const getImage = async () => {
    try {
      const imageURL = await Storage.get(seeker.profilePic.key, {
        bucket: seeker.profilePic.bucket,
        region: seeker.profilePic.region,
      });
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };
  */

  /*useEffect(() => {
    if (seeker && seeker.profilePic) {
      getImage();
    }
  }, []);*/

  return (
    <>
      <div className="card card-custom gutter-b h-sm-600px">
        <div className="card-body">
          <div className="d-flex">{props.children}</div>
        </div>
      </div>
    </>
  );
}
