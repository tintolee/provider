/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSubmit from "./ForgotPasswordSubmit";
import CompleteNewPassword from "./CompleteNewPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`,
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  Welcome to ConnecMe2 Provider Portal!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  Revolutionising recruitment and building stronger communities
                  in the process.
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white d-flex align-items-center">
                  &copy; 2020 ConnecMe2
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                  <a
                    href="https://connecme2.com/cm2-disclaimer.pdf"
                    rel="noreferrer"
                    target="_blank"
                    className="m-3 text-white"
                  >
                    Disclaimer
                  </a>
                  <a
                    href="https://connecme2.com/cm2-community-guidelines.pdf"
                    rel="noreferrer"
                    target="_blank"
                    className="m-3 text-white"
                  >
                    Community Guidelines
                  </a>
                  <a
                    href="https://connecme2.com/cm2-provider-privacy-policy.pdf"
                    rel="noreferrer"
                    target="_blank"
                    className="m-3 text-white"
                  >
                    Privacy
                  </a>
                  <a
                    href="https://connecme2.com/cm2-copyright-policy.pdf"
                    rel="noreferrer"
                    target="_blank"
                    className="m-3 text-white"
                  >
                    Copyright
                  </a>
                  <a href="mailto:hello@cm2.co.uk" className="m-3 text-white">
                    Contact
                  </a>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/complete-newpassword/:username"
                  component={CompleteNewPassword}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <ContentRoute
                  path="/auth/forgot-password-submit"
                  component={ForgotPasswordSubmit}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2022 ConnecMe2
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <a
                  href="https://connecme2.com/cm2-disclaimer.pdf"
                  rel="noreferrer"
                  target="_blank"
                  className="mx-3"
                >
                  Disclaimer
                </a>
                <a
                  href="https://connecme2.com/cm2-community-guidelines.pdf"
                  rel="noreferrer"
                  target="_blank"
                  className="mx-3"
                >
                  Community Guidelines
                </a>
                <a
                  href="https://connecme2.com/cm2-provider-privacy-policy.pdf"
                  rel="noreferrer"
                  target="_blank"
                  className="mx-3"
                >
                  Privacy
                </a>
                <a
                  href="https://connecme2.com/cm2-copyright-policy.pdf"
                  rel="noreferrer"
                  target="_blank"
                  className="mx-3"
                >
                  Copyright
                </a>
                <a href="mailto:hello@cm2.co.uk" className="mx-3">
                  Contact
                </a>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
