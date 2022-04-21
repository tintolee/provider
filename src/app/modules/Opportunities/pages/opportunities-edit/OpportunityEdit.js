import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { Storage, Auth } from "aws-amplify";
import * as actions from "../../_redux/opportunities/opportunitiesActions";
import * as opportunityTypesActions from "../../_redux/opportunityTypes/opportunityTypesActions";
import * as userActions from "../../../Auth/_redux/providerUsers/userActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import awsAppConfig from "../../../../../awsAppConfig";
import { AttendeesUIProvider } from "../opportunities-attendees/AttendeesUIContext";
import { Attendees } from "../opportunities-attendees/Attendees";
import { OpportunityEditForm } from "./OpportunityEditForm";
import IphoneMock from "./IphoneMock";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import moment from "moment";
import { Image } from "react-bootstrap";
import { S3Image } from "aws-amplify-react";
import { values } from "lodash";
import { useToasts } from "react-toast-notifications";

export function OpportunityEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const { addToast } = useToasts();
  const suhbeader = useSubheader();
  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [percentUploaded, setPercentUploaded] = useState(0);
  const [loading, setLoading] = useState(false);

  const [opportunityValues, setOpportunityValues] = useState({
    id: undefined,
    status: "1",
    title: undefined,
    location: undefined,
    date: undefined,
    description: undefined,
    caption: undefined,
    applicationRequired: "select",
    deadline: undefined,
    capacity: undefined,
    opportunityType: "select",
    organiser: "select",
    coverPhoto: undefined,
    opportunityProvider: undefined,
  });

  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const {
    actionsLoading,
    opportunityForEdit,
    opportunityTypes,
    organiserUsers,
    user,
  } = useSelector(
    (state) => ({
      actionsLoading: state.opportunities.actionsLoading,
      opportunityForEdit: state.opportunities.opportunityForEdit,
      opportunityTypes: state.opportunityTypes.entities,
      organiserUsers: state.providerUsers.entities,
      user: state.auth.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    console.log("use effect triggered");
    if (opportunityForEdit) {
      setOpportunityValues((prev) => ({
        id: opportunityForEdit.id,
        status: opportunityForEdit.status,
        title: opportunityForEdit.title,
        location: opportunityForEdit.location,
        date: moment(opportunityForEdit.date).toDate(),
        description: opportunityForEdit.description,
        caption: opportunityForEdit.caption,
        applicationRequired: opportunityForEdit.applicationRequired,
        deadline: moment(opportunityForEdit.applicationDeadline).toDate(),
        capacity: opportunityForEdit.capacity,
        opportunityType: opportunityForEdit.opportunityType.id,
        organiser: opportunityForEdit.organiser.id,
        coverPhoto: opportunityForEdit.cover,
        opportunityProvider: opportunityForEdit.opportunityProvider.id,
      }));
    }

    dispatch(opportunityTypesActions.fetchOpportunityTypes());
    dispatch(userActions.fetchProviderUsersByProvider(user.providerId));
  }, [user.providerId, dispatch, opportunityForEdit]);

  useEffect(() => {
    if (!id) {
      setOpportunityValues({
        id: undefined,
        status: "1",
        title: undefined,
        location: undefined,
        date: undefined,
        description: undefined,
        caption: undefined,
        applicationRequired: "select",
        deadline: undefined,
        capacity: undefined,
        opportunityType: "select",
        organiser: "select",
        coverPhoto: undefined,
        opportunityProvider: user.providerId,
      });
    }
  }, [id]);

  useEffect(() => {
    dispatch(actions.fetchOpportunity(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Opportunity";
    if (opportunityForEdit && id) {
      _title = `Edit Opportunity '${opportunityForEdit.title}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunityForEdit, id]);

  const saveOpportunity = async (values) => {
    setLoading(true);
    const input = {
      id: values.id ? values.id : undefined,
      title: values.title,
      location: values.location,
      date: values.date,
      description: values.description,
      caption: values.caption,
      capacity: values.capacity,
      status: values.status,
      applicationRequired: values.applicationRequired === "true" ? true : false,
      applicationDeadline: values.applicationDeadline,
      opportunityOrganiserId: values.organiser,
      opportunityOpportunityTypeId: values.opportunityType,
      opportunityOpportunityProviderId: values.opportunityProvider,
    };

    if (Object.values(errors).every((val) => val === "valid")) {
      if (values.coverPhoto?.name) {
        let formData = new FormData();
        formData.append("file", imagePreview);
        formData.append("upload_preset", "r4v1flgt");
        const options = {
          method: "POST",
          body: formData,
        };
        fetch("https://api.Cloudinary.com/v1_1/drt1ulcak/image/upload", options)
          .then((res) => res.json())
          .then((res) => (input.cover = res.secure_url))
          .catch((err) => console.log(err));
      }
      console.log("no errors");
      if (!id) {
        dispatch(actions.createOpportunity(input)).then(() => {
          setLoading(false);
          backToOpportunitiesList("created");
        });
      } else {
        dispatch(actions.updateOpportunity(input)).then(() => {
          backToOpportunitiesList("updated");
          setLoading(false);
        });
      }
    } else {
      console.log("there were some errors");
      setLoading(false);
    }
  };

  const btnRef = useRef();

  const backToOpportunitiesList = (state) => {
    addToast(`Opportunity ${state}`, {
      appearance: "success",
    });
    history.push(`/opportunities`);
  };

  const [errors, setErrors] = useState({
    title: undefined,
    location: undefined,
    date: undefined,
    description: undefined,
    caption: undefined,
    applicationRequired: undefined,
    deadline: undefined,
    capacity: undefined,
    opportunityType: undefined,
    organiser: undefined,
    coverPhoto: undefined,
  });

  const checkErrors = () => {
    setErrors(() => ({
      title: "valid",
      location: "valid",
      date: "valid",
      description: "valid",
      caption: "valid",
      applicationRequired: "valid",
      deadline: "valid",
      capacity: "valid",
      opportunityType: "valid",
      organiser: "valid",
      coverPhoto: "valid",
    }));

    if (!opportunityValues.title) {
      setErrors((prev) => ({ ...prev, title: "Title is required." }));
    } else if (opportunityValues.title && opportunityValues.title.length > 60) {
      setErrors((prev) => ({
        ...prev,
        title: "Title must be 60 characters or less.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, title: "valid" }));
    }

    if (!opportunityValues.location) {
      setErrors((prev) => ({ ...prev, location: "Location is required." }));
    } else if (
      opportunityValues.location &&
      opportunityValues.location.lngth > 60
    ) {
      setErrors((prev) => ({
        ...prev,
        location: "Location must be 60 characters or less.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, location: "valid" }));
    }

    if (!opportunityValues.description) {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required.",
      }));
    } else if (
      opportunityValues.description &&
      opportunityValues.description.length > 3000
    ) {
      setErrors((prev) => ({
        ...prev,
        description: "Description must be 3000 characters or less.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: "valid" }));
    }

    if (opportunityValues.applicationRequired === "select") {
      setErrors((prev) => ({
        ...prev,
        applicationRequired: "Application Required is required.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, applicationRequired: "valid" }));
    }

    if (opportunityValues.opportunityType === "select") {
      setErrors((prev) => ({
        ...prev,
        opportunityType: "Opportunity Type is required.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, opportunityType: "valid" }));
    }

    if (opportunityValues.organiser === "select") {
      setErrors((prev) => ({
        ...prev,
        organiser: "Organiser is required.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, organiser: "valid" }));
    }

    if (!opportunityValues.coverPhoto) {
      setErrors((prev) => ({
        ...prev,
        coverPhoto: "Upload a cover photo.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, coverPhoto: "valid" }));
    }
  };

  useEffect(() => {
    if (opportunityValues) {
      console.log("saving opportunity");
      saveOpportunity(opportunityValues);
    }
  }, [errors]);

  const saveOpportunityClick = (e) => {
    e.preventDefault();
    checkErrors();
  };

  const wrapper = useRef();

  return (
    <div className="row">
      <div className="col-lg-8">
        <Card>
          {actionsLoading && <ModalProgressBar />}
          <CardHeader title={title}>
            {loading ? (
              <div className="spinner spinner-primary mr-10"></div>
            ) : (
              <CardHeaderToolbar>
                <button
                  type="button"
                  onClick={backToOpportunitiesList}
                  className="btn btn-light"
                >
                  <i className="fa fa-arrow-left"></i>
                  Back
                </button>
                <button
                  // type="submit"
                  className="btn btn-secondary ml-2"
                >
                  Save as Draft
                </button>
                <button
                  // type="submit"
                  className="btn btn-quaternary ml-2"
                >
                  Archive
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  onClick={saveOpportunityClick}
                  ref={btnRef}
                >
                  Publish
                </button>
              </CardHeaderToolbar>
            )}
          </CardHeader>
          <CardBody>
            <ul className="nav nav-tabs nav-tabs-line " role="tablist">
              <li className="nav-item" onClick={() => setTab("basic")}>
                <a
                  className={`nav-link ${tab === "basic" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  // aria-selected={(tab === "basic").toString()}
                  href="#details"
                >
                  Opportunity Details
                </a>
              </li>
              {id && (
                <>
                  {" "}
                  <li
                    className="nav-item"
                    onClick={() => setTab("appliedSeekers")}
                  >
                    <a
                      className={`nav-link ${tab === "appliedSeekers" &&
                        "active"}`}
                      data-toggle="tab"
                      role="button"
                      href="#seekers"
                    >
                      Applied Seekers
                    </a>
                  </li>
                </>
              )}
            </ul>
            <div className="mt-5">
              {tab === "basic" && (
                <OpportunityEditForm
                  actionsLoading={actionsLoading}
                  opportunityTypes={opportunityTypes}
                  organiserUsers={organiserUsers}
                  btnRef={btnRef}
                  saveOpportunity={saveOpportunity}
                  percentUploaded={percentUploaded}
                  opportunityValues={opportunityValues}
                  setOpportunityValues={setOpportunityValues}
                  errors={errors}
                  user={user}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              )}
              {tab === "appliedSeekers" && id && (
                <AttendeesUIProvider currentOpportunityId={id}>
                  <Attendees />
                </AttendeesUIProvider>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="col-lg-4">
        <Card>
          <CardHeader title="Preview" />
          <CardBody className="d-flex justify-content-center">
            <IphoneMock
              mockType="opportunity"
              applicationRequired={opportunityValues.applicationRequired}
              wrapper={wrapper}
            >
              <div className="opportunity-image">
                <div className="opportunity-img-wrapper">
                  {imagePreview ? (
                    <Image src={imagePreview} fluid />
                  ) : (
                    opportunityValues.coverPhoto && (
                      <S3Image
                        imgKey={opportunityValues.coverPhoto.key}
                        theme={{
                          photoImg: { maxWidth: "100%", maxHeight: "100%" },
                        }}
                      />
                    )
                  )}
                </div>
                {opportunityValues.capacity && (
                  <div className="opportunity-availability">
                    <p
                      className="font-size-xs m-2"
                      style={{ fontSize: wrapper?.current?.offsetWidth / 30 }}
                    >
                      <b>Limited Availability</b>
                    </p>
                  </div>
                )}
              </div>
              <div className="opportunity-details"> 
                <p
                  className="font-size-sm mb-2"
                  style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                >
                  Hosted by <b>{user.providerName}</b>
                </p>
                <h1 style={{ fontSize: wrapper?.current?.offsetWidth / 12 }}>
                  <b>
                    {opportunityValues.title
                      ? opportunityValues.title
                      : "Opportunity Title"}
                  </b>
                </h1>
                <p
                  className="font-size-sm mb-2"
                  style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                >
                  <span className="mr-1">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Map/Marker1.svg")}
                    />
                  </span>
                  {opportunityValues.location
                    ? opportunityValues.location
                    : "Opportunity Location"}
                </p>
                <p
                  className="font-size-sm mb-8"
                  style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                >
                  <span className="mr-1">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Home/Clock.svg")}
                    />
                  </span>
                  {opportunityValues.date
                    ? moment(opportunityValues.date).format("DD MMM, YYYY")
                    : "Opportunity Date"}
                </p>
                <p
                  className="font-size-sm mt-8 mb-2"
                  style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                >
                  Who's attending
                </p>
                <div className="d-flex">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Contact1.svg"
                    )}
                    width={24}
                  />
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Contact1.svg"
                    )}
                    width={24}
                  />
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Contact1.svg"
                    )}
                    width={24}
                  />
                </div>
                {opportunityValues.description ? (
                  <p
                    className="font-size-sm mb-2 mt-5"
                    style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                  >
                    {opportunityValues.description}
                  </p>
                ) : (
                  <p
                    className="font-size-sm mb-2 mt-5"
                    style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam cupiditate dignissimos doloremque veniam tenetur
                    et officia magnam officiis perspiciatis laudantium. Debitis
                  </p>
                )}
                <div className="d-flex mt-5">
                  <span class="svg-icon svg-icon-primary svg-icon-3x mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="solid"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path
                          d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z"
                          fill="none"
                          stroke="black"
                          stroke-width="1px"
                          fill-rule="nonzero"
                        />
                      </g>
                    </svg>
                  </span>
                  <span class="svg-icon svg-icon-primary svg-icon-3x mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M3,13.5 L19,12 L3,10.5 L3,3.7732928 C3,3.70255344 3.01501031,3.63261921 3.04403925,3.56811047 C3.15735832,3.3162903 3.45336217,3.20401298 3.70518234,3.31733205 L21.9867539,11.5440392 C22.098181,11.5941815 22.1873901,11.6833905 22.2375323,11.7948177 C22.3508514,12.0466378 22.2385741,12.3426417 21.9867539,12.4559608 L3.70518234,20.6826679 C3.64067359,20.7116969 3.57073936,20.7267072 3.5,20.7267072 C3.22385763,20.7267072 3,20.5028496 3,20.2267072 L3,13.5 Z"
                          fill="none"
                          stroke="black"
                          strokeWidth="1px"
                        />
                      </g>
                    </svg>
                  </span>
                  <span class="svg-icon svg-icon-primary svg-icon-3x">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M8,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,17.726765 C18,18.2790497 17.5522847,18.726765 17,18.726765 C16.7498083,18.726765 16.5087052,18.6329798 16.3242754,18.4639191 L12.6757246,15.1194142 C12.2934034,14.7689531 11.7065966,14.7689531 11.3242754,15.1194142 L7.67572463,18.4639191 C7.26860564,18.8371115 6.63603827,18.8096086 6.26284586,18.4024896 C6.09378519,18.2180598 6,17.9769566 6,17.726765 L6,6 C6,4.8954305 6.8954305,4 8,4 Z"
                          fill="none"
                          stroke="black"
                          strokeWidth="1px"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <p
                  className="font-size-sm my-2"
                  style={{ fontSize: wrapper?.current?.offsetWidth / 25 }}
                >
                  Liked by <b>johnsmith</b>, <b>jessicasmith</b> and{" "}
                  <b>512 others</b>
                </p>
                <p className="font-size-sm mb-2 mt-5">
                  {opportunityValues.caption}
                </p>
              </div>
            </IphoneMock>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
