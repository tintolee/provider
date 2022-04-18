import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { completeNewPassword } from "../_redux/awsAuth";

const initialValues = {
  password: "",
  confirmPassword: "",
};

function CompleteNewPassword(props) {
  const {
    intl,
    location,
    match: {
      params: { username },
    },
  } = props;
  const [loading, setLoading] = useState(false);

  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    confirmPassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
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
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      if (
        location.userData !== undefined &&
        location.userData.username === username
      ) {
        completeNewPassword(location.userData, values.password)
          .then(() => {
            disableLoading();
            props.login(username);
          })
          .catch((err) => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              err
                ? err.message
                : intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN",
                  })
            );
          });
      } else {
        disableLoading();
        setSubmitting(false);
        setStatus(
          intl.formatMessage({
            id: "AUTH.VALIDATION.INVALID_LOGIN",
          })
        );
      }
    },
  });

  return (
    <div className="login-form login-forgot" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Set New Password</h3>
        <div className="text-muted font-weight-bold">
          Set your new password to complete registration
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
      >
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
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

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "confirmPassword"
            )}`}
            name="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.confirmPassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        <div className="form-group d-flex flex-wrap flex-center">
          <button
            id="kt_login_forgot_submit"
            type="submit"
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
            disabled={formik.isSubmitting}
          >
            <span>Submit</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
          <Link to="/auth">
            <button
              type="button"
              id="kt_login_forgot_cancel"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              <span>Cancel</span>
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(CompleteNewPassword));
