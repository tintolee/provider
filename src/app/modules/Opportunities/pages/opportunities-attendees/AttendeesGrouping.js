import React, { useMemo } from "react";
import { useAttendeesUIContext } from "./AttendeesUIContext";

export function AttendeesGrouping() {
  const attendeesUIContext = useAttendeesUIContext();
  const attendeesUIProps = useMemo(() => {
    return {
      ids: attendeesUIContext.ids,
      setIds: attendeesUIContext.setIds,
      openUpdateAttendeesStatusDialog:
        attendeesUIContext.openUpdateAttendeesStatusDialog,
    };
  }, [attendeesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{attendeesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={attendeesUIProps.openUpdateAttendeesStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
