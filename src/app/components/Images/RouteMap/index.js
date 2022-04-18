import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

export default function ImageSource({ photo }) {
  const [imageSource, setImageSource] = useState(null);

  const getImage = async ({ key, bucket, region }) => {
    try {
      const imageURL = await Storage.get(key, {
        bucket: bucket,
        region: region,
      });
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (photo?.photo) {
      getImage(photo?.photo[0]);
    }
  }, []);

  if (photo?.photo) {
    console.log(photo.photo);
    return (
      <image
        className="step-image"
        x="0%"
        y="0%"
        width="1"
        height="1"
        href={imageSource}
        preserveAspectRatio="xMidYMid slice"
      ></image>
    );
  } else {
    return null;
  }
}
