/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { checkIsActive } from '../../../../_helpers';

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? 'menu-item-active' : '';
  };

  return (
    <div
      id='kt_header_menu'
      className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/dashboard'
          )}`}
        >
          <NavLink className='menu-link' to='/dashboard'>
            <span className='menu-text'>Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className='menu-arrow' />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li className={`menu-item  ${getMenuItemActive('/opportunities')}`}>
          <NavLink
            // activeStyle={{
            //   backgroundColor: '#f89534',
            //   color: '#fff',
            // }}
            className='menu-link'
            to='/opportunities'
          >
            <span className='menu-text'>Opportunities</span>
            {layoutProps.rootArrowEnabled && <i className='menu-arrow' />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/contents'
          )}`}
        >
          <NavLink className='menu-link' to='/contents'>
            <span className='menu-text'>Contents</span>
            {layoutProps.rootArrowEnabled && <i className='menu-arrow' />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/followers'
          )}`}
        >
          <NavLink className='menu-link' to='/followers'>
            <span className='menu-text'>Followers</span>
            {layoutProps.rootArrowEnabled && <i className='menu-arrow' />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/providers-community'
          )}`}
        >
          <NavLink className='menu-link' to='/providers-community'>
            <span className='menu-text'>Providers Community</span>
            {layoutProps.rootArrowEnabled && <i className='menu-arrow' />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/messages"
          )}`}
        >
          <NavLink className="menu-link" to="/messages">
            <span className="menu-text">Messages</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/special-projects"
          )}`}
        >
          <NavLink className='menu-link' to='/special-projects'>
            <span className='menu-text'>Special Projects</span>
            {layoutProps.rootArrowEnabled && <i className='menu-arrow' />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*Classic submenu*/}
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}
