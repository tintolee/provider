import React from "react";
import { ContentsTable } from "./ContentsTable";
import { ContentsLoadingDialog } from "./ContentsLoadingDialog";

export function Contents() {

  return (
    <>
      <ContentsLoadingDialog />
      <ContentsTable />
    </>
  );
}
