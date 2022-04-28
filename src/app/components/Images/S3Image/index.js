import React, { useEffect, useState } from 'react';
export default function ImageS3({ photo,...props }) {
  const [imageSource, setImageSource] = useState(photo);
  const [imageLoaded, setImageLoaded] = useState(false);



  useEffect(() => {
  
  }, []);
  return (
    <>
      {imageSource && !imageLoaded && (
        <img
          alt=''
          src={photo}
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
