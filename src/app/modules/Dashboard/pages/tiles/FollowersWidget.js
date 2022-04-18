/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import { NavLink } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';

export function FollowersWidget({
  className,
  iconColor = 'success',
  widgetHeight = '150px',
  followers,
}) {
  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{ height: widgetHeight }}
      >
        <div className='card-body'>
          <NavLink to='followers'>
            <span className={`svg-icon svg-icon-3x svg-icon-${iconColor}`}>
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Communication/Group.svg')}
              />
            </span>
          </NavLink>
          <div class='mt-3'>
            <NavLink
              to='followers'
              className='text-dark text-hover-primary font-weight-bolder font-size-h2'
            >
              {followers && followers.items.length}
            </NavLink>
          </div>
          <NavLink
            to='followers'
            className='text-muted text-hover-primary font-weight-bold font-size-lg mt-1'
          >
            Total Followers
          </NavLink>
        </div>
      </div>
    </>
  );
}
