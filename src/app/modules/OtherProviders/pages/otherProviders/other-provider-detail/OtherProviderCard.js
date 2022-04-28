/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "react-bootstrap";
import  ImageS3 from "../../../../../../app/components/Images/S3Image";
import {toAbsoluteUrl} from "../../../../../../_metronic/_helpers";

export function OtherProviderCard({ provider }) {
  return (
    <>
      {provider && (
        <div className="d-flex mb-9">
          <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
            <div>
              {provider.logo && (

                <ImageS3
                className="card-img-top h-225px"
                alt=" "
                photo={provider.logo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = toAbsoluteUrl(
                    "/media/routemap-media/false-post.jpg"
                  );
                }}
              />
                
              )}
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-75 font-size-h2 font-weight-bold mr-3">{provider.name}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold">{provider.tagline}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold">Primary Sector : {provider.primarySector == null ? "": provider.primarySector.name}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold">Parent : {provider.parent}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold">Address : {provider.address}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold">Website : <a
                  href="#"
                  className="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                >
                  {provider.website}
                </a></div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold"><i className="flaticon2-rocket-1 mr-2 font-size-lg"></i>Seekers can follow you for :</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-75 font-weight-bold">{provider.opportunityTypes}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold"><i className="flaticon2-rocket-1 mr-2 font-size-lg"></i>Areas my organisation can help seekers in :</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-75 font-weight-bold">Career</div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <div className="text-dark-50 font-weight-bold">Other Sectors : {provider.secondarySector}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <Card style={{ textAlign: 'center' }}>
                  <Card.Body>
                    <Card.Title>New followers this week</Card.Title>
                    <Card.Text>
                      {provider.weeklyFollowers}
                    </Card.Text>
                  </Card.Body>
                </Card>

              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <Card style={{ textAlign: 'center' }}>
                  <Card.Body>
                    <Card.Title>Total Followers</Card.Title>
                    <Card.Text>
                      {provider.followers.items.length}
                    </Card.Text>
                  </Card.Body>
                </Card>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
