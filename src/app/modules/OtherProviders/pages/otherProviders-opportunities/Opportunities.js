import React from "react";
import { OpportunitiesTable } from "./OpportunitiesTable";
import { OpportunitiesLoadingDialog } from "./OpportunitiesLoadingDialog";

export function Opportunities() {

  return (
    <>
      <OpportunitiesLoadingDialog />
      <OpportunitiesTable />
    </>
  );
}
