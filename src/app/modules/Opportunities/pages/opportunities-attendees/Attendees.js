import React, { useMemo } from "react";
import { AttendeesFilter } from "./AttendeesFilter";
import { AttendeesList } from "./AttendeesList";
import { AttendeesLoadingDialog } from "./AttendeesLoadingDialog";
import { AttendeesUpdateStatusDialog } from "./AttendeesUpdateStatusDialog";
import { AttendeesGrouping } from "./AttendeesGrouping";
import { useAttendeesUIContext } from "./AttendeesUIContext";

export function Attendees() {
  const attendessUIContext = useAttendeesUIContext();
  const attendessUIProps = useMemo(() => {
    return { ids: attendessUIContext.ids };
  }, [attendessUIContext]);

  return (
    <>
      <AttendeesLoadingDialog />
      <AttendeesUpdateStatusDialog />
      <div className="form margin-b-30">
        <AttendeesFilter />
        {attendessUIProps.ids.length > 0 && (
          <>
            <AttendeesGrouping />
            <br />
          </>
        )}
      </div>
      <AttendeesList />
    </>
  );
}
