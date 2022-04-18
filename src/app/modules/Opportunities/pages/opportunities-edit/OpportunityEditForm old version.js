import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PhotoPicker, S3Image } from "aws-amplify-react";
import { Image, ProgressBar } from "react-bootstrap";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";
import { resizeFile } from "../../../../utils/FileResizer";
import { APPLICATIONREQUIRED } from "../OpportunitiesUIHelpers";

export function OpportunityEditForm({
  opportunity,
  btnRef,
  saveOpportunity,
  opportunityTypes,
  organiserUsers,
  percentUploaded,
}) {
  // Validation schema

  const validOpportunityTypes = opportunityTypes?.map(({ id }) => id);

  console.log(validOpportunityTypes);

  const OpportunityEditSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters")
      .required("Title is required"),
    opportunityType: Yup.string()
      .required("Opportunity Type is required")
      .oneOf(["yes"]),
    description: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(250, "Maximum 5000 symbols")
      .nullable(false)
      .required("Description is required"),
    caption: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(250, "Maximum 5000 characters"),
    date: Yup.mixed().nullable(true),
    applicationDeadline: Yup.mixed().nullable(true),
    capacity: Yup.number().nullable("true"),
    location: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(250, "Maximum 500 characters")
      .required("Location is required"),
    applicationRequired: Yup.bool().required(
      "Application Required is required"
    ),
    // opportunityType: Yup.object().shape({
    //   id: Yup.string().required("Opportunity Type is required"),
    // }),
    organiser: Yup.object().shape({
      id: Yup.string().required("Organiser is required"),
    }),
    cover: Yup.mixed().required(),
  });

  console.log(OpportunityEditSchema);

  const [imagePreview, setImagePreview] = useState("");

  const onPhotoPickChange = async ({ file }, fieldName, callback) => {
    try {
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
        initialValues={opportunity}
        // validationSchema={OpportunityEditSchema}
        onSubmit={(values) => {
          saveOpportunity(values);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="title"
                    component={Input}
                    placeholder="Title"
                    label="Title"
                    type="text"
                  />
                </div>
                <div className="col-lg-4 d-flex flex-column">
                  <DatePickerField
                    name="date"
                    label="Enter Date of Opportunity"
                    autoComplete="off"
                  />
                </div>
                <div className="col-lg-4 d-flex flex-column">
                  <Field
                    as="select"
                    label="Opportunity Types"
                    name="opportunityType"
                    component={Select}
                  >
                    <option value="yes">Select</option>
                    {opportunityTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Field>
                  {/* <Select name="opportunityType.id" label="Opportunity Types">
                    <option key="" value="">
                      Select
                    </option>
                    {opportunityTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Select> */}
                </div>
              </div>
              <div className="form-group">
                <label>Enter Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Enter Caption</label>
                <Field name="caption" as="textarea" className="form-control" />
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select
                    name="applicationRequired"
                    label="Application Required"
                  >
                    {APPLICATIONREQUIRED.map((required) => (
                      <option key={required.text} value={required.value}>
                        {required.text}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="applicationDeadline"
                    label="Deadline for Applications/Registrations"
                    autoComplete="off"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="capacity"
                    component={Input}
                    placeholder="Number of places available"
                    label="Number of places available"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="location"
                    component={Input}
                    placeholder="Location"
                    label="Location"
                  />
                </div>
                <div className="col-lg-4">
                  <Select name="status" label=" Status">
                    <option value="0">Archive</option>
                    <option value="1">Active</option>
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Select name="organiser.id" label="Organiser">
                    <option key="" value="">
                      Select
                    </option>
                    {organiserUsers.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.firstName} {type.lastName}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              {percentUploaded > 0 && (
                <div className="form-group">
                  <ProgressBar animated now={percentUploaded} />
                </div>
              )}
              <div className="form-group row">
                <div className="col-lg-4">
                  <PhotoPicker
                    title="Browse"
                    preview="hidden"
                    headerText="Cover Image"
                    onLoad={(url) => {
                      setImagePreview(url);
                    }}
                    onPick={(file) => {
                      onPhotoPickChange(file, "cover", setFieldValue);
                    }}
                  />
                </div>
                <div className="col-lg-8">
                  {/* {percentUploaded > 0 && (
                    <ProgressBar animated now={percentUploaded} />
                  )} */}
                  {imagePreview ? (
                    <Image src={imagePreview} fluid />
                  ) : (
                    values.cover && (
                      <S3Image
                        imgKey={values.cover.key}
                        theme={{
                          photoImg: { maxWidth: "100%", maxHeight: "100%" },
                        }}
                      />
                    )
                  )}
                </div>
              </div>
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
