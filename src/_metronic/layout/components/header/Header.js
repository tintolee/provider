import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { S3Image } from 'aws-amplify-react';
import objectPath from 'object-path';
import { toAbsoluteUrl } from '../../../_helpers';
import { useHtmlClassService } from '../../_core/MetronicLayout';
import { Topbar } from './Topbar';
import { HeaderMenuWrapper } from './header-menu/HeaderMenuWrapper';

export function Header() {
  const uiService = useHtmlClassService();
  const { user } = useSelector((state) => state.auth, shallowEqual);

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses('header', true),
      headerAttributes: uiService.getAttributes('header'),
      headerContainerClasses: uiService.getClasses('header_container', true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        'header.menu.self.display'
      ),
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses}`}
        id='kt_header'
        {...layoutProps.headerAttributes}
      >
        {/*begin::Container*/}
        <div
          className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}
        >
          {/* begin::Left */}
          <div className='d-flex align-items-stretch mr-3'>
            {/* begin::Header Logo */}
            <div className='header-logo'>
              <Link to='/'>
                {/* Show Provider logo from DB */}
                {/* {user && user.provider && user.provider.logo ? (
                  <S3Image
                    imgKey={user.provider.logo.key}
                    theme={{
                      photoImg: { maxWidth: "100%", maxHeight: "50px" },
                    }}
                  />
                ) : (
                  <img
                    className="logo-default max-h-40px"
                    alt="Logo"
                    src={toAbsoluteUrl("/media/logos/logo-white.png")}
                  />
                )} */}
                <img
                  className='logo-default max-h-40px'
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/logo-multi.png')}
                />
                <img
                  className='logo-sticky max-h-40px'
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/logo-multi.png')}
                />
              </Link>
            </div>
            {/* end::Header Logo */}
            {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          </div>
          {/* end::Left */}

          {/*begin::Topbar*/}
          <Topbar />
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
