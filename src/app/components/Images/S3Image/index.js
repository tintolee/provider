import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

export default function ImageS3({ photo, ...props }) {
  const [imageSource, setImageSource] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    if (photo) {
      getImage(photo);
    }
  }, []);
  return (
    <>
      {imageSource && !imageLoaded && (
        <img
          alt=''
          src={imageSource}
          {...props}
          onError={() => setImageLoaded(true)}
        />
      )}
      <div
        style={{
          background: '#f89534',
          height: '225px',
          width: '100%',
          borderTopLeftRadius: 'calc(0.42rem - 1px)',
          borderTopRightRadius: 'calc(0.42rem - 1px)',
          display: imageSource && !imageLoaded && 'none',
        }}
      />
    </>
  );
}
