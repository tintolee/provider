import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import * as actions from "../../_redux/opportunityAttendees/opportunityAttendeesActions";
import { AttendeeCard } from "./attendees-list/AttendeeCard";
import { useAttendeesUIContext } from "./AttendeesUIContext";

export function AttendeesList() {
  const attendeesUIContext = useAttendeesUIContext();
  const attendeesUIProps = useMemo(() => {
    return {
      ids: attendeesUIContext.ids,
      setIds: attendeesUIContext.setIds,
      queryParams: attendeesUIContext.queryParams,
      setQueryParams: attendeesUIContext.setQueryParams,
      opportunityId: attendeesUIContext.opportunityId,
    };
  }, [attendeesUIContext]);

  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.opportunityAttendees }),
    shallowEqual
  );
  const { entities, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    attendeesUIProps.setIds([]);
    dispatch(
      actions.fetchAttendees(
        attendeesUIProps.queryParams,
        attendeesUIProps.opportunityId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendeesUIProps.queryParams, dispatch, attendeesUIProps.opportunityId]);

  if (listLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (entities && entities.length === 0) {
    return (
      <>
        <div
          className="alert alert-custom alert-light-primary fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-information"></i>
          </div>
          <div className="alert-text">No attendees yet!</div>
        </div>
      </>
    );
  }

  return (
    <>
      {entities !== null &&
        entities.map((item, index) => (
          // console.log(item)
          <AttendeeCard
            key={`ki${index}`}
            opportunityAttendee={item}
            ids={attendeesUIProps.ids}
            setIds={attendeesUIProps.setIds}
            entities={entities}
            index={index}
          />
        ))}
    </>
  );
}
