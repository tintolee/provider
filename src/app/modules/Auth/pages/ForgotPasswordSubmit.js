import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { requestPasswordSubmit } from "../_redux/awsAuth";

const initialValues = {
  email: "",
  code: "",
  password: "",
};

function ForgotPasswordSubmit(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const ForgotPasswordSubmitSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    code: Yup.string()
      .min(6, "Minimum 6 symbols")
      .max(6, "Maximum 6 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSubmitSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      requestPasswordSubmit(values.email, values.code, values.password)
        .then(() => {
          disableLoading();
          setIsRequested(true);
        })
        .catch((err) => {
          setIsRequested(false);
          setSubmitting(false);
          setStatus(
            err
              ? err.message
              : intl.formatMessage(
                  { id: "AUTH.VALIDATION.NOT_FOUND" },
                  { name: values.email }
                )
          );
          disableLoading();
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Submit Your Password</h3>
            <div className="text-muted font-weight-bold">
              Enter your detail to reset your password
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

            {/* begin: Email */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Email"
                type="email"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "email"
                )}`}
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.email}</div>
                </div>
              ) : null}
            </div>
            {/* end: Email */}

            {/* begin: Verification Code */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Verification Code"
                type="text"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "code"
                )}`}
                name="code"
                {...formik.getFieldProps("code")}
              />
              {formik.touched.code && formik.errors.code ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.code}</div>
                </div>
              ) : null}
            </div>
            {/* end: verification Code */}

            {/* begin: Password */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="New Password"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
            {/* end: Password */}

            <div className="form-group d-flex flex-wrap flex-center">
              {/* <button
                        id="kt_login_forgot_submit"
                        type="submit"
                        className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                        disabled={formik.isSubmitting}
                    >
                        Submit
              </button> */}
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
              >
                <span>Submit</span>
                {loading && (
                  <span className="ml-3 spinner spinner-white"></span>
                )}
              </button>

              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPasswordSubmit));
