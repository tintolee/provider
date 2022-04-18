import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { confirmSignUp } from "../_redux/awsAuth";

const initialValues = {
    verificationCode: ""
};

function Confirmation(props) {
    const { intl, match: { params: { email } } } = props;
    const [isSent, setIsSent] = useState(false);

    const ForgotPasswordSchema = Yup.object().shape({
        verificationCode: Yup.string()
            .min(6, "Minimum 6 symbols")
            .max(6, "Maximum 6 symbols")
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
    });

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
            confirmSignUp(email, values.verificationCode)
                .then(() => setIsSent(true))
                .catch((err) => {
                    setIsSent(false);
                    setSubmitting(false);
                    setStatus(err ? err.message :
                        intl.formatMessage(
                            { id: "AUTH.VALIDATION.NOT_FOUND" },
                            { name: email }
                        )
                    );
                });
        },
    });

    return (
        <>
            {isSent && <Redirect to="/auth" />}
            {!isSent && (
                <div className="login-form login-forgot" style={{ display: "block" }}>
                    <div className="text-center mb-10 mb-lg-20">
                        <h3 className="font-size-h1">Sign Up Confirmation</h3>
                        <div className="text-muted font-weight-bold">
                            Enter your activation code to complete registration
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

                        {/* begin: verificationCode */}
                        <div className="form-group fv-plugins-icon-container">
                            <input
                                placeholder="Verification Code"
                                type="text"
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                    "verificationCode"
                                )}`}
                                name="verificationCode"
                                {...formik.getFieldProps("verificationCode")}
                            />
                            {formik.touched.verificationCode && formik.errors.verificationCode ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.verificationCode}</div>
                                </div>
                            ) : null}
                        </div>
                        {/* end: verificationCode */}

                        <div className="form-group d-flex flex-wrap flex-center">
                            <button
                                id="kt_login_forgot_submit"
                                type="submit"
                                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                disabled={formik.isSubmitting}
                            >
                                Submit
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

export default injectIntl(connect(null, auth.actions)(Confirmation));
