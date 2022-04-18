import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { EMPLOYEE_COUNT } from "../SpecialProjectsUIHelpers";
import * as providerSectorsActions from "../../../../modules/CompanyProfile/_redux/providerSectors/providerSectorsActions";

// Validation schema
const SpecialProjectEditSchema = Yup.object().shape({
  contactName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 1000 symbols")
    .required("Contact Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  telephoneNumber: Yup.string()
    .min(11, "Minimum 11 symbols")
    .max(14, "Maximum 15 symbols")
    .required("Contact telephone Number is required"),
  mobileNumber: Yup.string()
    .min(11, "Minimum 11 symbols")
    .max(14, "Maximum 15 symbols")
    .required("Mobile Number is required"),
  projectDescription: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 500 symbols")
    .required("Project description is required"),
  primarySector: Yup.string()
    .ensure()
    .required("Primary Sector is required!"),
  employeeCount: Yup.string()
    .ensure()
    .required("Employee Count is required!"),
});

export function SpeicalProjectEditForm({ btnRef, saveProject }) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user, shallowEqual);
  // const opportunityTypes = user.provider.opportunityTypes.items;

  const { providerSectors } = useSelector(
    (state) => ({
      providerSectors: state.providerSectors.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(providerSectorsActions.fetchOpportunityProviderSectors());
  }, [dispatch]);

  var initialValues = {
    contactName: "",
    email: "",
    telephoneNumber: "",
    mobileNumber: "",
    opportunityType: "",
    primarySector: providerSectors.length !== 0 ? providerSectors[0].id : "",
    employeeCount: EMPLOYEE_COUNT[0].value,
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={SpecialProjectEditSchema}
        onSubmit={(values) => {
          saveProject(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              {/* <div className="form-group row">
                <div className="col-lg-4">
                  <label>Opportunity Type</label>
                  <select
                    name="opportunityType"
                    label="Opportunity Type"
                    onChange={(e) => {
                      setFieldValue("opportunityType", e.target.value);
                    }}
                  >
                    {opportunityTypes.map((type) => (
                      <option
                        key={type.opportunityType.name}
                        value={type.opportunityType.id}
                      >
                        {type.opportunityType.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="contactName"
                    component={Input}
                    placeholder="Contact Name"
                    label="Contact Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="email"
                    component={Input}
                    placeholder="Email Address"
                    label="Email Address"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="telephoneNumber"
                    component={Input}
                    placeholder="Telephone Number"
                    label="Telephone Number"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="mobileNumber"
                    component={Input}
                    placeholder="Mobile Number"
                    label="Mobile Number"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="mr-5">Primary Sector</label>
                  <select
                    name="primarySector"
                    label="Primary Sector"
                    onChange={(e) => {
                      setFieldValue("primarySector", e.target.value);
                    }}
                  >
                    {providerSectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="mr-5">No. of Employees</label>
                  <select
                    name="employeeCount"
                    label="employeeCount"
                    onChange={(e) => {
                      setFieldValue("employeeCount", e.target.value);
                    }}
                  >
                    {EMPLOYEE_COUNT.map((count) => (
                      <option key={count.text} value={count.value}>
                        {count.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label>Tell us a bit about your project</label>
              <Field
                name="projectDescription"
                as="textarea"
                rows={5}
                className="form-control"
              />
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
