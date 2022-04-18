import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../_metronic/_partials/controls";

export function SpecialProjectsLoadingDialog() {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.specialProjects.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
