import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  AttendeeStatusCssClasses,
  AttendeeStatusTitles,
} from "./AttendeesUIHelper";
import * as actions from "../../_redux/opportunityAttendees/opportunityAttendeesActions";
import { useAttendeesUIContext } from "./AttendeesUIContext";

const selectedAttendees = (entities, ids) => {
  const _attendees = [];
  ids.forEach((id) => {
    const attendee = entities.find((el) => el.id === id);
    if (attendee) {
      _attendees.push(attendee);
    }
  });
  return _attendees;
};

export function AttendeesUpdateStatusDialog() {
  const attendeesUIContext = useAttendeesUIContext();
  const attendeesUIProps = useMemo(() => {
    return {
      ids: attendeesUIContext.ids,
      setIds: attendeesUIContext.setIds,
      show: attendeesUIContext.showUpdateAttendeesStatusDialog,
      onHide: attendeesUIContext.closeUpdateAttendeesStatusDialog,
      queryParams: attendeesUIContext.queryParams,
      opportunityId: attendeesUIContext.opportunityId,
    };
  }, [attendeesUIContext]);

  const { attendees, isLoading } = useSelector(
    (state) => ({
      attendees: selectedAttendees(
        state.opportunityAttendees.entities,
        attendeesUIProps.ids
      ),
      isLoading: state.opportunityAttendees.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!attendeesUIProps.ids || attendeesUIProps.ids.length === 0) {
      attendeesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendeesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update attendees status by selected ids
    dispatch(actions.updateAttendeeStatus(attendeesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(
          actions.fetchAttendees(
            attendeesUIProps.queryParams,
            attendeesUIProps.opportunityId
          )
        ).then(() => {
          // clear selections list
          attendeesUIProps.setIds([]);
          // closing delete modal
          attendeesUIProps.onHide();
        });
      }
    );
  };

  return (
    <Modal
      show={attendeesUIProps.show}
      onHide={attendeesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected attendees
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>SEEKER</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={`id${attendee.id}`}>
                <td>
                  <span className="ml-3">
                    {attendee.seeker.firstName} {attendee.seeker.lastName}
                  </span>
                </td>
                <td>
                  <span
                    className={`label label-lg label-${
                      AttendeeStatusCssClasses[attendee.status]
                    } label-inline`}
                  >
                    {" "}
                    {AttendeeStatusTitles[attendee.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Unregistered</option>
            <option value="1">Registered</option>
            <option value="2">Invited</option>
            <option value="3">Applied</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={attendeesUIProps.onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
