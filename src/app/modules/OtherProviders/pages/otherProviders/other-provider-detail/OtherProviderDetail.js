/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/otherProviders/otherProvidersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { OtherProviderCard } from "./OtherProviderCard";
import { OpportunitiesUIProvider } from "../../otherProviders-opportunities/OpportunitiesUIContext";
import { Opportunities } from "../../otherProviders-opportunities/Opportunities";
import { ContentsUIProvider } from "../../otherProvider-contents/ContentsUIContext";
import { Contents } from "../../otherProvider-contents/Contents";

export function OtherProviderDetail({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("opportunities");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, opportunityProvoderForDetail } = useSelector(
    (state) => ({
      actionsLoading: state.opportunityProviders.actionsLoading,
      opportunityProvoderForDetail: state.opportunityProviders.opportunityProvoderForDetail
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchOpportunityProvider(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "Opportunity Provider Detail";
    if (opportunityProvoderForDetail && id) {
      _title = `Viewing other Opportunity Provider - ${opportunityProvoderForDetail.name}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunityProvoderForDetail, id]);

  const backToOPList = () => {
    history.push(`/providers-community`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToOPList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OtherProviderCard provider={opportunityProvoderForDetail} />

        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("opportunities")}>
            <a
              className={`nav-link ${tab === "opportunities" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "opportunities").toString()}
            >
              Opportunities
            </a>
          </li>
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("contents")}>
                <a
                  className={`nav-link ${tab === "contents" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "contents").toString()}
                >
                  Contents
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "opportunities" && (
            <OpportunitiesUIProvider currentOpportunityProviderId={id}>
              <Opportunities />
            </OpportunitiesUIProvider>
          )}
          {tab === "contents" && (
            <ContentsUIProvider currentOpportunityProviderId={id}>
              <Contents />
            </ContentsUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
