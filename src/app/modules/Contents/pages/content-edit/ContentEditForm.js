import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PhotoPicker } from "aws-amplify-react";
import { Image, ProgressBar } from "react-bootstrap";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import { resizeFile } from "../../../../utils/FileResizer";
import { CONTENT_TYPE } from "../ContentsUIHelpers";
import { VISIBILITY } from "../ContentsUIHelpers";
import ImageS3 from "../../../../components/Images/S3Image";
import {toAbsoluteUrl } from "../../../../../_metronic/_helpers";

// Validation schema
const ContentEditSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 1000 symbols")
    .required("Content title is required"),
  description: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 5000 symbols")
    .required("Content description is required"),
  video: Yup.string().when("type", {
    is: "Video",
    then: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter a correct Video URL"
      )
      .required("Video URL is required"),
  }),
  blogTitle: Yup.string().when("type", {
    is: "Blog",
    then: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(250, "Maximum 1000 symbols")
      .required("Blog Title is required"),
  }),
  blogDescription: Yup.string().when("type", {
    is: "Blog",
    then: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(250, "Maximum 5000 symbols")
      .required("Blog Description is required"),
  }),
  blogCoverPhoto: Yup.mixed().when("type", {
    is: "Blog",
    then: Yup.mixed().required(),
  }),
  photo: Yup.mixed().when("type", {
    is: "Photo",
    then: Yup.mixed().required(),
  }),
});

export function ContentEditForm({
  content,
  btnRef,
  saveContent,
  percentUploaded,
  setImagePreview,
  imagePreview
}) {
  const [contentType, setContentType] = useState("");

  var initialValues = content;

  if (content.id !== "undefined") {
    initialValues = {
      id: content.id,
      title: content.title,
      description: content.description,
      type: content.type,
      blogTitle: content.blogTitle,
      blogDescription: content.blogDescription,
      blogCoverPhoto: content.blogCoverPhoto,
      visibility: content.visibility,
      video: content.video,
      photo: content.photo,
      positiveFeedbacks: content.positiveFeedbacks,
      status: content.status,
      opportunityProvider: {
        id: content.opportunityProvider.id,
      },
      createdBy: {
        id: content.createdBy.id,
      },
    };
  }

  const onPhotoPickChange = async ({ file }, fieldName, callback) => {
    try {

      console.log(file)
      const config = {
        maxWidth: 500,
        maxHeight: 500,
        compressFormat: "JPEG",
        quality: 90,
      };

      const image = await resizeFile(file, config);

      callback(fieldName, image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ContentEditSchema}
        onSubmit={(values) => {
          saveContent(values);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="title"
                    component={Input}
                    placeholder="Title"
                    label="Title"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="description"
                    component={Input}
                    placeholder="Description"
                    label="Description"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select
                    name="type"
                    label="Type of Content"
                    onLoad={setContentType(
                      values.type ? values.type : content.type
                    )}
                    onChange={(e) => {
                      setFieldValue("type", e.target.value);
                      setContentType(e.target.value);
                    }}
                  >
                    {CONTENT_TYPE.map((content) => (
                      <option key={content.text} value={content.value}>
                        {content.text}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              {(() => {
                switch (contentType) {
                  case "Blog":
                    return (
                      <div className="form-group">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Field
                              name="blogTitle"
                              component={Input}
                              placeholder="Blog Title"
                              label="Blog Title"
                            />
                          </div>
                        </div>
                        <label>Blog Description</label>
                        <Field
                          name="blogDescription"
                          as="textarea"
                          rows={5}
                          className="form-control"
                        />
                        <div className="form-group row">
                          <div className="col-lg-4">
                            <PhotoPicker
                              name="blogCoverPhoto"
                              title="Browse"
                              preview="hidden"
                              headerText="Blog Cover Photo"
                              onLoad={(url) => {
                                setImagePreview(url);
                              }}
                              onPick={(file) => {
                                onPhotoPickChange(
                                  file,
                                  "blogCoverPhoto",
                                  setFieldValue
                                );
                              }}
                            />
                          </div>
                          <div className="col-lg-8">
                            {percentUploaded > 0 && (
                              <ProgressBar animated now={percentUploaded} />
                            )}
                            {imagePreview ? (
                              <Image src={imagePreview} fluid />
                            ) : (
                              values.blogCoverPhoto && (


                                <ImageS3
                                className="card-img-top h-225px"
                                alt=" "
                                photo={values.blogCoverPhoto}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = toAbsoluteUrl(
                                    "/media/routemap-media/false-post.jpg"
                                  );
                                }}
                              />
                              )
                            )}
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-4">
                            <Select
                              name="visibility"
                              label="Visibility"
                              onChange={(e) => {
                                setFieldValue("visibility", e.target.value);
                              }}
                            >
                              {VISIBILITY.map((required) => (
                                <option
                                  key={required.text}
                                  value={required.value}
                                >
                                  {required.text}
                                </option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    );
                  case "Video":
                    return (
                      <div className="form-group">
                        <Field
                          name="video"
                          component={Input}
                          placeholder="Video URL"
                          label="Video URL"
                        />
                      </div>
                    );
                  default:
                    return (
                      <div className="form-group row">
                        <div className="col-lg-4">
                          <PhotoPicker
                            title="Browse"
                            preview="hidden"
                            headerText="Photo"
                            onLoad={(url) => {
                              setImagePreview(url);
                            }}
                            onPick={(file) => {
                              onPhotoPickChange(file, "photo", setFieldValue);
                            }}
                          />
                        </div>
                        <div className="col-lg-8">
                          {percentUploaded > 0 && (
                            <ProgressBar animated now={percentUploaded} />
                          )}
                          {imagePreview ? (
                            <Image src={imagePreview} fluid />
                          ) : (
                            values.photo && (

                              <ImageS3
                              className="card-img-top h-225px"
                              alt=" "
                              photo={values.photo}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = toAbsoluteUrl(
                                  "/media/routemap-media/false-post.jpg"
                                );
                              }}
                            />
                            )
                          )}
                        </div>
                      </div>
                    );
                }
              })()}
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
