import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useAttendeesUIContext } from "./AttendeesUIContext";

const prepareFilter = (queryParams, values) => {
  const { status } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // filter.text = searchText;
  // Filter by status
  if (status) {
    filter.status = status !== "" ? { eq: +status } : undefined;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function AttendeesFilter() {
  const attendeesUIContext = useAttendeesUIContext();
  const attendeesUIProps = useMemo(() => {
    return {
      setQueryParams: attendeesUIContext.setQueryParams,
      queryParams: attendeesUIContext.queryParams,
    };
  }, [attendeesUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(attendeesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, attendeesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      attendeesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-2 margin-bottom-10-mobile">
            <Formik
              initialValues={{
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
                <form onSubmit={handleSubmit}>
                  <div>
                    {/* <input
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
                    /> */}
                    <select
                      className="form-control"
                      placeholder="Filter by Status"
                      name="status"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                        handleSubmit();
                      }}
                      value={values.type}
                    >
                      <option value="">All</option>
                      <option value="1">Registered</option>
                      <option value="2">Invited</option>
                      <option value="3">Applied</option>
                      <option value="0">Unregistered</option>
                    </select>
                    <small className="form-text text-muted">
                      <b>Filter</b> by Status
                    </small>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="col-md-10 margin-bottom-10-mobile"></div>
        </div>
      </div>
    </>
  );
}
