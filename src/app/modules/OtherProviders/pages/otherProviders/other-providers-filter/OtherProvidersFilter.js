import React, { useMemo, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useOtherProvidersUIContext } from "../../OtherProvidersUIContext";
import Select from 'react-select';
import * as providerSectorsActions from "../../../../CompanyProfile/_redux/providerSectors/providerSectorsActions";

const prepareFilter = (queryParams, values) => {
  const { primarySectorId, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  if (primarySectorId) {
    if (primarySectorId.length !== 0) {
      filter.or = [];
      primarySectorId.forEach(type => {
        filter.or.push({ primarySectorId: { eq: type.value } })
      })
    }
  }

  // Filter by all fields
  if (searchText) {
    filter.or = [
      { name: { contains: searchText.toLowerCase() } },
    ]
  }

  if (!primarySectorId && !searchText) {
    newQueryParams.filter = null;
  }
  else {
    newQueryParams.filter = filter;
  }

  return newQueryParams;
};

export function OtherProvidersFilter({ listLoading }) {
  // projects UI Context
  const projectsUIContext = useOtherProvidersUIContext();
  const dispatch = useDispatch();
  const projectsUIProps = useMemo(() => {
    return {
      queryParams: projectsUIContext.queryParams,
      setQueryParams: projectsUIContext.setQueryParams,
    };
  }, [projectsUIContext]);

  const { providerSectors } = useSelector(
    (state) => ({
      providerSectors: state.providerSectors.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(providerSectorsActions.fetchOpportunityProviderSectors());
  }, [dispatch]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(projectsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, projectsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      projectsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          primarySectorId: "",
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
                  <Select
                    isMulti
                    name="primarySectorId"
                    isSearchable="true"
                    options={providerSectors.map((sector) => (
                      {
                        value: sector.id,
                        label: sector.name
                      }
                    ))}
                    className="basic-multi-select"
                    onChange={(e) => {
                      setFieldValue("primarySectorId", e);
                      handleSubmit();
                    }}
                  />
                  <small className="form-text text-muted">
                    <b>Filter</b> by Primary Sector
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
                    <b>Search</b> by Name
                </small>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
