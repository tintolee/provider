import Resizer from "react-image-file-resizer";

const resizeFile = (file, { maxWidth, maxHeight, compressFormat, quality }) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export { resizeFile };
