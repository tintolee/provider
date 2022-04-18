import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Storage } from "aws-amplify";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import moment from "moment";

export function RouteMapCard({ routeMap, seekerId }) {
  const [imageSource, setImageSource] = useState(null);

  const getImage = async () => {
    try {
      const imageURL = await Storage.get(routeMap.coverPhoto.key, {
        bucket: routeMap.coverPhoto.bucket,
        region: routeMap.coverPhoto.region,
      });
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };

  const getLastUpdated = (rm) => {
    if (rm.posts.items.length) {
      let sortedPosts = rm.posts.items.slice().sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return `Last updated ${moment(sortedPosts[0].createdAt).fromNow()}`;
    } else return `Created ${moment(rm.createdAt).fromNow()}`;
  };

  useEffect(() => {
    if (routeMap) {
      if (routeMap.coverPhoto) {
        getImage();
      }
    }
  }, []);

  return (
    <>
      {routeMap && (
        <Card className="card card-custom gutter-b">
          {routeMap.coverPhoto && (
            <NavLink
              className="card-img-top-wrapper"
              to={`/followers/${seekerId}/route-map/${routeMap.id}`}
            >
              <img
                className="card-img-top"
                src={imageSource}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = toAbsoluteUrl(
                    "/media/routemap-media/false-post.png"
                  );
                }}
              />
            </NavLink>
          )}
          <Card.Body>
            <span className="card-title font-weight-bold text-muted font-size-h5">
              Destination:
            </span>
            <NavLink
              to={`/followers/${seekerId}/route-map/${routeMap.id}`}
              className="font-weight-bolder text-dark-75 text-hover-primary font-size-h2 mb-0 d-block"
            >
              {routeMap.destination}
            </NavLink>
            <div className="text-muted mb-2 font-size-sm">
              {getLastUpdated(routeMap)}
            </div>
            {routeMap.focusAreas && routeMap.focusAreas.length !== 0 ? (
              <span className="font-weight-bold font-size-lg">
                Focus areas: {routeMap.focusAreas.map((item) => item).join(", ")}
              </span>
            ) : null}
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center flex-shrink-0">
                <div className="d-flex flex-column align-items-center text-dark-75">
                  {routeMap.posts && (
                    <span className="font-weight-bolder font-size-h5">
                      {routeMap.posts.items.length}
                    </span>
                  )}
                  <span className="font-weight-bolder font-size-sm">Steps</span>
                </div>
              </div>
              <div className="d-flex align-items-center flex-shrink-0 ">
                <div className="d-flex flex-column align-items-center text-dark-75">
                  <span className="font-weight-bolder font-size-h5">0</span>
                  <span className="font-weight-bolder font-size-sm">
                    Attended
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center flex-shrink-0">
                <div className="d-flex flex-column align-items-center text-dark-75">
                  <span className="font-weight-bolder font-size-h5">0</span>
                  <span className="font-weight-bolder font-size-sm">
                    Hosted
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center flex-shrink-0">
                <div className="d-flex flex-column align-items-center text-dark-75">
                  <span className="font-weight-bolder font-size-h5">0</span>
                  <span className="font-weight-bolder font-size-sm">
                    Collaborated
                  </span>
                </div>
              </div>
            </div>
          </Card.Footer>
        </Card>
      )}
    </>
  );
}
