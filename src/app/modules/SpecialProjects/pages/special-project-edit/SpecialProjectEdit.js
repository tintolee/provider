import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../_redux/specialProjectActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SpeicalProjectEditForm } from "./SpecialProjectEditForm";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";

export function SpecialProjectEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { actionsLoading, user } = useSelector(
    (state) => ({
      actionsLoading: state.specialProjects.actionsLoading,
      user: state.auth.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "Send a Special Project Request";

    setTitle(_title);
    suhbeader.setTitle(_title);
  }, [suhbeader, id]);

  const saveProject = async (values) => {
    const input = {
      opportunityProviderId: user.providerId,
      opportunityProviderUserId: user.userId,
      contactName: values.contactName,
      email: values.email,
      telephoneNumber: values.telephoneNumber,
      mobileNumber: values.mobileNumber,
      employeeCount: values.employeeCount,
      projectSummary: values.projectDescription,
      status: 1,
      primarySectorId: values.primarySector,
    };

    if (!id) {
      dispatch(actions.createSpecialProject(input)).then(() =>
        backToSpecialProjectsList()
      );
    }
  };

  const btnRef = useRef();
  const saveProjectClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSpecialProjectsList = () => {
    history.push(`/special-projects`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToSpecialProjectsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProjectClick}
          >
            Send Request
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <SpeicalProjectEditForm
            actionsLoading={actionsLoading}
            btnRef={btnRef}
            saveProject={saveProject}
          />
        </div>
      </CardBody>
    </Card>
  );
}
