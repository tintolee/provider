/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function BreadCrumbs({ items, title, subheader, matchFunc }) {
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const titleArr = title.split('-');
  const opportunityEditRoute = matchFunc(
    location.pathname,
    '/opportunities/:id/edit'
  );
  const contentsEditRoute = matchFunc(location.pathname, '/contents/:id/edit');
  const followersProfileRoute = matchFunc(
    location.pathname,
    '/followers/:id/profile'
  );
  const followersProfileRouteMap = matchFunc(
    location.pathname,
    '/followers/:id/route-map/:id'
  );
  const followersProfileSteps = matchFunc(
    location.pathname,
    '/followers/:id/steps'
  );
  const followersProfileRouteMapSteps = matchFunc(
    location.pathname,
    '/followers/:id/route-map/:routemapId/steps'
  );

  if (!items || !items.length) {
    return '';
  }

  return (
    <div className='d-flex align-items-center font-weight-bold my-2'>
      <Link className='opacity-75 hover-opacity-100' to='/dashboard'>
        <i className='flaticon2-shelter icon-1x' />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          <Link
            className='text-hover-primary opacity-75 hover-opacity-100'
            to={{ pathname: item.pathname }}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
      {opportunityEditRoute && title && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          {title}
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          Edit
        </>
      )}
      {contentsEditRoute && title && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          {title}
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          Edit
        </>
      )}
      {followersProfileRoute && title && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          {titleArr[0]}
        </>
      )}
      {followersProfileRouteMap && title && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          <Link
            className='text-hover-primary opacity-75 hover-opacity-100'
            to={{
              pathname: `/followers/${pathArr[2]}/profile`,
            }}
          >
            {titleArr[0]}
          </Link>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          {titleArr[1]}
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          Route-map
        </>
      )}
      {followersProfileSteps && title && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          <Link
            className='text-hover-primary opacity-75 hover-opacity-100'
            to={{
              pathname: `/followers/${pathArr[2]}/profile`,
            }}
          >
            {titleArr[0]}
          </Link>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          Steps
        </>
      )}
      {followersProfileRouteMapSteps && title && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          <Link
            className='text-hover-primary opacity-75 hover-opacity-100'
            to={{
              pathname: `/followers/${pathArr[2]}/profile`,
            }}
          >
            {titleArr[0]}
          </Link>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          <Link
            className='text-hover-primary opacity-75 hover-opacity-100'
            to={{
              pathname: `/followers/${pathArr[2]}/route-map/${pathArr[4]}`,
            }}
          >
            {titleArr[1]}
          </Link>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          Routemap Steps
        </>
      )}
      {location.pathname === '/opportunities/new' && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          New
        </>
      )}
      {location.pathname === '/contents/new' && (
        <>
          <span className='label label-dot label-sm bg-secondary opacity-75 mx-3' />
          New
        </>
      )}
    </div>
  );
}
