import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useOpportunitiesUIContext } from "../OpportunitiesUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, searchText } = values;
  const newQueryParams = { ...queryParams };
  //Filter for GraphQL query
  const filter = {};
  // Filter by status
  if (status) {
    filter.status = status !== "" ? { eq: status } : undefined;
  }
  if (searchText) {
    filter.or = [
      { title: { contains: searchText.toLowerCase() } },
      { location: { contains: searchText } },
    ];
  }
  if (!status && !searchText) {
    newQueryParams.filter = null;
  } else {
    newQueryParams.filter = filter;
  }
  return newQueryParams;
};

export function OpportunitiesFilter({ listLoading }) {
  // Opportunities UI Context
  const opportunitiesUIContext = useOpportunitiesUIContext();
  const opportunitiesUIProps = useMemo(() => {
    return {
      setQueryParams: opportunitiesUIContext.setQueryParams,
      queryParams: opportunitiesUIContext.queryParams,
    };
  }, [opportunitiesUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      opportunitiesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, opportunitiesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      opportunitiesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Archived=0/Active=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Archived</option>
                  <option value="1">Active</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
