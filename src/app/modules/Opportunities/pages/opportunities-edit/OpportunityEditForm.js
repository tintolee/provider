import React, { useState } from "react";
import { PhotoPicker, S3Image } from "aws-amplify-react";
import { Image } from "react-bootstrap";
import { resizeFile } from "../../../../utils/FileResizer";
import DatePicker from "react-datepicker";
import Helper from "./Helper";

export function OpportunityEditForm({
  opportunityTypes,
  organiserUsers,
  opportunityValues,
  setOpportunityValues,
  errors,
  imagePreview,
  setImagePreview,
}) {

  const editForm = (e) => {
    setOpportunityValues({
      ...opportunityValues,
      [e.target.name]: e.target.value,
    });
  };

  const onPhotoPickChange = async ({ file }, fieldName, callback) => {
    try {
      const config = {
        maxWidth: 500,
        maxHeight: 500,
        compressFormat: "JPEG",
        quality: 90,
      };

      const image = await resizeFile(file, config);

      setOpportunityValues((prev) => ({ ...prev, coverPhoto: image }));
    } catch (err) {
      console.log(err);
    }
  };

  const [help, setHelp] = useState({
    title: false,
    location: false,
    date: false,
    description: false,
    caption: false,
    applicationRequired: false,
    deadline: false,
    capacity: false,
    opportunityType: false,
    organiser: false,
    coverPhoto: false,
  });

  const toggleHelp = (x) => {
    setHelp({ ...help, [x]: !help[x] });
  };

  return (
    <>
      <form action="" className="form form-label-right">
        <div className="form-group row">
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="title">
              Enter Opportunity Title:{" "}
              <Helper toggleHelp={() => toggleHelp("title")} />
            </label>
            <label
              className={`text-muted ${help.title ? "d-block" : "d-none"}`}
            >
              Enter a title that best encapsulates this opprtunity in less than
              60 characters.
            </label>
            <input
              type="text"
              name="title"
              className={`form-control ${
                errors.title === "valid"
                  ? "is-valid"
                  : errors.title
                  ? "is-invalid"
                  : ""
              }`}
              onChange={editForm}
              value={opportunityValues.title}
            />
            <label
              className={
                errors.title === "valid" ? "d-none" : "text-quaternary"
              }
            >
              {errors.title}
            </label>
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="location">
              Enter Opportunity Location(s):{" "}
              <Helper toggleHelp={() => toggleHelp("location")} />
            </label>
            <label
              className={`text-muted ${help.location ? "d-block" : "d-none"}`}
            >
              Enter the location(s) where your opportunity will take place. If
              your opportunity takes place online, you can just 'online',
              'webinar', or whatever you feel is best suited for your audience.
            </label>
            <input
              type="text"
              name="location"
              className={`form-control ${
                errors.location === "valid"
                  ? "is-valid"
                  : errors.location
                  ? "is-invalid"
                  : ""
              }`}
              onChange={editForm}
              value={opportunityValues.location}
            />
            <label
              className={
                errors.location === "valid" ? "d-none" : "text-quaternary"
              }
            >
              {errors.location}
            </label>
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="title">
              Enter Opportunity Date:{" "}
              <Helper toggleHelp={() => toggleHelp("date")} />
            </label>
            <label className={`text-muted ${help.date ? "d-block" : "d-none"}`}>
              Enter the date that your opportunity will take place. If your
              opportunity takes place over the course of several days, enter the
              date it starts. If there is no set start date, leave this field
              blank. This is not the place to enter a deadline, rather there is
              a place for that below.
            </label>
            <DatePicker
              className={`form-control ${
                errors.date === "valid" ? "is-valid" : ""
              }`}
              style={{ width: "100%" }}
              name="date"
              autoComplete="off"
              onChange={(data) =>
                setOpportunityValues({ ...opportunityValues, date: data })
              }
              dateFormat="MM-dd-yyyy"
              selected={opportunityValues?.date instanceof Date && !isNaN(opportunityValues?.date) ? opportunityValues.date : undefined}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Enter Opportunity Description:{" "}
            <Helper toggleHelp={() => toggleHelp("description")} />
          </label>
          <label
            className={`text-muted ${help.description ? "d-block" : "d-none"}`}
          >
            Describe your opportunity in less than 3000 characters. This is
            where you should include all relevant details seekers may need
            before applying or RSVPing. It will appear on your opportunity page.
          </label>
          <textarea
            name="description"
            className={`form-control ${
              errors.description === "valid"
                ? "is-valid"
                : errors.description
                ? "is-invalid"
                : ""
            }`}
            onChange={editForm}
            value={opportunityValues.description}
          />
          <label
            className={
              errors.description === "valid" ? "d-none" : "text-quaternary"
            }
          >
            {errors.description}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="caption">
            Enter Opportunity Caption:{" "}
            <Helper toggleHelp={() => toggleHelp("caption")} />
          </label>
          <label
            className={`text-muted ${help.caption ? "d-block" : "d-none"}`}
          >
            Write a few words or sentences about your opportunity in less than
            3000 characters. The caption appears beneath your post in a seeker's
            feed, and again at the bottom of the opportunity page.
          </label>
          <textarea
            name="caption"
            className={`form-control ${
              errors.caption === "valid" ? "is-valid" : ""
            }`}
            onChange={editForm}
            value={opportunityValues.caption}
          />
        </div>
        <div className="form-group row">
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="title">
              Select Application Required:{" "}
              <Helper toggleHelp={() => toggleHelp("applicationRequired")} />
            </label>
            <label
              className={`text-muted ${
                help.applicationRequired ? "d-block" : "d-none"
              }`}
            >
              If seekers must apply to an opportunity to be registered, select{" "}
              <b>Yes</b>. If this opportunity does not require applications,
              select <b>No</b>. Some things to consider: if applications are
              required, you can view all applied seekers in the{" "}
              <b>Applied Seekers</b> section of the portal and update their
              status to <b>Rejected</b> or <b>Registered</b>. This will notify
              the seekers to expect future correspondence from your team
              regarding next steps. If applications are not required, all
              seekers who RSVP will automatically be registered and, if more
              information is required, will expect future correspondence from
              your team.
            </label>
            <select
              name="applicationRequired"
              className={`form-control ${
                errors.applicationRequired === "valid"
                  ? "is-valid"
                  : errors.applicationRequired
                  ? "is-invalid"
                  : ""
              }`}
              onChange={editForm}
              value={opportunityValues.applicationRequired}
            >
              <option value="select">Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <label
              className={
                errors.applicationRequired === "valid"
                  ? "d-none"
                  : "text-quaternary"
              }
            >
              {errors.applicationRequired}
            </label>
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="deadline">
              Enter Deadline {true ? "for RSVPs" : "for Applications"}:{" "}
              <Helper toggleHelp={() => toggleHelp("deadline")} />
            </label>
            <label
              className={`text-muted ${help.deadline ? "d-block" : "d-none"}`}
            >
              Enter the deadline for application or RSVPs. If there is no
              deadline, leave this field blank.
            </label>
            <DatePicker
              className={`form-control ${
                errors.deadline === "valid" ? "is-valid" : ""
              }`}
              style={{ width: "100%" }}
              onChange={(data) =>
                setOpportunityValues({ ...opportunityValues, deadline: data })
              }
              name="deadline"
              autoComplete="off"
              dateFormat="MM-dd-yyyy"
              selected={opportunityValues?.deadline instanceof Date && !isNaN(opportunityValues?.deadline) ? opportunityValues.deadline : undefined}
            />
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="capacity">
              Enter Capacity:{" "}
              <Helper toggleHelp={() => toggleHelp("capacity")} />
            </label>
            <label
              className={`text-muted ${help.capacity ? "d-block" : "d-none"}`}
            >
              If there are a limited number of spaces available, or there are a
              limited number of applications being considered, enter that number
              here. If there is no capacity, leave this field blank.
            </label>
            <input
              type="number"
              name="capacity"
              className={`form-control ${
                errors.capacity === "valid" ? "is-valid" : ""
              }`}
              onChange={editForm}
              value={opportunityValues.capacity}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="opportunityType">
              Select Opportunity Type:{" "}
              <Helper toggleHelp={() => toggleHelp("opportunityType")} />
            </label>
            <label
              className={`text-muted ${
                help.opportunityType ? "d-block" : "d-none"
              }`}
            >
              Select the type of opportunity. If the type of your opportunity is
              not listed, choose Other, and make sure to describe your
              opportunity well in the description.
            </label>
            <select
              name="opportunityType"
              className={`form-control ${
                errors.opportunityType === "valid"
                  ? "is-valid"
                  : errors.opportunityType
                  ? "is-invalid"
                  : ""
              }`}
              onChange={editForm}
              value={opportunityValues.opportunityType}
            >
              <option value="select">Select</option>
              {opportunityTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <label
              className={
                errors.opportunityType === "valid"
                  ? "d-none"
                  : "text-quaternary"
              }
            >
              {errors.opportunityType}
            </label>
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <label htmlFor="organiser">
              Select Organiser:{" "}
              <Helper toggleHelp={() => toggleHelp("organiser")} />
            </label>
            <label
              className={`text-muted ${help.organiser ? "d-block" : "d-none"}`}
            >
              Select the team member responsible for organising this
              opportunity. This field is only for internal purposes. It does not
              affect how the opportunity will appear to seekers.
            </label>
            <select
              name="organiser"
              className={`form-control ${
                errors.organiser === "valid"
                  ? "is-valid"
                  : errors.organiser
                  ? "is-invalid"
                  : ""
              }`}
              onChange={editForm}
            >
              <option key="" value="">
                Select
              </option>
              {organiserUsers.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.firstName} {type.lastName}
                </option>
              ))}
            </select>
            <label
              className={
                errors.organiser === "valid" ? "d-none" : "text-quaternary"
              }
            >
              {errors.organiser}
            </label>
          </div>
          <div className="col-lg d-flex flex-column">
            <label htmlFor="">
              Upload Opportunity Image:{" "}
              <Helper toggleHelp={() => toggleHelp("coverPhoto")} />
            </label>
            <label
              className={`text-muted ${help.coverPhoto ? "d-block" : "d-none"}`}
            >
              Upload a cover photo that is representative of the opportunity
              being published. It is usually the first thing seekers will notice
              when scrolling through their feed.
            </label>
            <button className="btn btn-primary w-fit d-flex align-items-center justify-content-center">
              <span class="svg-icon svg-icon-primary svg-icon-2x">
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
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                      d="M6,5 L18,5 C19.6568542,5 21,6.34314575 21,8 L21,17 C21,18.6568542 19.6568542,20 18,20 L6,20 C4.34314575,20 3,18.6568542 3,17 L3,8 C3,6.34314575 4.34314575,5 6,5 Z M5,17 L14,17 L9.5,11 L5,17 Z M16,14 C17.6568542,14 19,12.6568542 19,11 C19,9.34314575 17.6568542,8 16,8 C14.3431458,8 13,9.34314575 13,11 C13,12.6568542 14.3431458,14 16,14 Z"
                      fill="#ffffff"
                    />
                  </g>
                </svg>
              </span>{" "}
              <b>Browse</b>
            </button>
            <PhotoPicker
              preview="hidden"
              title="Browse"
              theme={{
                cursor: "pointer",
                color: "#FFFFFF",
                backgroundColor: "#f89534",
              }}
              headerText="Cover Image"
              onLoad={(url) => {
                setImagePreview(url);
              }}
              onPick={(file) => {
                onPhotoPickChange(file, "cover");
              }}
            />
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
            <label
              className={
                errors.coverPhoto === "valid" ? "d-none" : "text-quaternary"
              }
            >
              {errors.coverPhoto}
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
