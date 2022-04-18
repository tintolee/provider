import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import moment from "moment";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import ImageS3 from "../../../../components/Images/S3Image";

export function PostsList({ routeMap }) {
  const [sortedPosts, setsortedPosts] = useState(null);

  useEffect(() => {
    setsortedPosts(
      routeMap?.posts?.items?.slice()?.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  }, []);

  console.log(routeMap);

  return (
    <>
      {sortedPosts && (
        <div className="card card-custom">
          <div className="card-body d-flex align-items-center">
            <NavLink
              className="svg-icon svg-icon-3x svg-icon-white ml-n2"
              to={`${routeMap?.id}/steps`}
            >
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Layout/Layout-4-blocks.svg"
                )}
              />
            </NavLink>
            <div className="ml-3">
              <div className="text-dark font-weight-bolder font-size-h2 mt-3">
                <NavLink
                  className="text-dark text-hover-primary font-weight-bolder font-size-h2 mt-3"
                  to={`${routeMap?.id}/steps`}
                >
                  {sortedPosts?.length}
                </NavLink>
              </div>
              <NavLink
                to={`${routeMap?.id}/steps`}
                className={`text-muted font-weight-bold font-size-lg mt-1`}
              >
                Total Steps
              </NavLink>
            </div>
          </div>
          <div className="card-body flex-column">
            {sortedPosts?.map((post) => {
              return (
                <div className="d-flex px-1 py-3">
                  <NavLink
                    className="square-post-img-wrapper"
                    to={`${routeMap?.id}/steps#${post.id}`}
                  >
                    {post?.photo ? (
                      <ImageS3
                        className="card-img-top"
                        alt=" "
                        photo={post.photo[0]}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = toAbsoluteUrl(
                            "/media/routemap-media/false-post.jpg"
                          );
                        }}
                      />
                    ) : (
                      <div className="bg-primary w-100 h-100 d-flex align-items-center justify-content-center text-white font-size-xlg font-weight-boldest">
                        {post?.blog
                          ? post?.blog?.blogTitle?.[0]
                          : post?.caption?.[0]}
                      </div>
                    )}
                  </NavLink>
                  <div className="ml-3 d-flex flex-column  justify-content-center">
                    <NavLink
                      className="font-size-h5 font-weight-bold text-dark text-hover-primary"
                      to={`${routeMap?.id}/steps#${post.id}`}
                    >
                      {post.blog?.blogTitle && post.blog.blogTitle.length > 31
                        ? post.blog.blogTitle.substring(0, 30) + "..."
                        : post.blog?.blogTitle
                        ? post.blog.blogTitle
                        : post.caption && post.caption.length > 31
                        ? post.caption.substring(0, 30) + "..."
                        : post.caption
                        ? post.caption
                        : "Unititled"}
                    </NavLink>
                    <span className="text-muted">
                      {post.type
                        .toLowerCase()
                        .charAt(0)
                        .toUpperCase() + post.type.toLowerCase().slice(1)}{" "}
                      ||{" "}
                      {post.createdAt &&
                        moment(post.createdAt).format("DD MMM")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
