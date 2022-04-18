/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';
import { S3Image } from '../../../../components';
import { Storage } from 'aws-amplify';

export function PostCard({ seeker, post, scrollTo }) {
  const [profilePic, setProfilePic] = useState('');

  const getImage = async () => {
    try {
      const imageURL = await Storage.get(seeker.profilePic.key, {
        bucket: seeker.profilePic.bucket,
        region: seeker.profilePic.region,
      });
      setProfilePic(imageURL);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (seeker && seeker.profilePic) {
      getImage();
    }
  }, []);
  return (
    <>
      {post && (
        <div
          id={post.id}
          className={`card card-custom gutter-b ${
            post.type === 'MILESTONE' ? 'border-primary' : ''
          }`}
        >
          <div className='card-body' id={post.id} ref={scrollTo}>
            <div className='d-flex align-items-center'>
              <div className='symbol symbol-40 symbol-light-success mr-5'>
                <img
                  alt='Pic'
                  src={profilePic}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = toAbsoluteUrl(
                      '/media/routemap-media/false-post.jpg'
                    );
                  }}
                />
              </div>
              <div className='d-flex flex-column flex-grow-1'>
                <NavLink
                  to={`/followers/${seeker.id}/profile`}
                  className=' text-hover-primary text-dark-75 mb-1 font-size-lg font-weight-bolder'
                >
                  {seeker.firstName} {seeker.lastName}
                </NavLink>
                <span className='text-muted font-weight-bold text-capitalize'>
                  {post.type.toLowerCase()} ||{' '}
                  {post.createdAt && moment(post.createdAt).format('LLLL')}
                </span>
              </div>
            </div>
            <div className='pt-4'>
              {post.type === 'BLOG' ? (
                <>
                  <div className='bgi-no-repeat bgi-size-cover rounded JG__blog-photo overflow-hidden d-flex align-items-center'>
                    {/* <div
                      className={`overlay p-2 ${
                        post.blog.blogCoverPhoto ? "has-photo" : ""
                      }`}
                    >
                      <h1 className="text-dark-75 font-size-xxlg font-weight-bolder pt-5 mb-2">
                        {post.blog.blogTitle} title
                      </h1>
                      <br />
                      <p className="text-dark-75 font-size-xlg font-weight-normal pt-5 mb-2">
                        {post.blog.blogDescription} description
                      </p>
                    </div> */}
                    {post.blog.blogCoverPhoto && (
                      <S3Image photo={post.blog.blogCoverPhoto} width='100%' />
                    )}
                  </div>
                  <h1 className='text-dark-75 font-size-xxlg font-weight-bolder pt-5 mb-2'>
                    {post.blog.blogTitle}
                  </h1>
                  <p className='text-dark-75 font-size-xlg font-weight-normal pt-5 mb-2'>
                    {post.blog.blogDescription}
                  </p>
                </>
              ) : post.type === 'PHOTO' ? (
                <>
                  <div className='bgi-no-repeat bgi-size-cover rounded overflow-hidden align-items-center d-flex'>
                    {post.photo && (
                      <S3Image photo={post.photo[0]} width='100%' />
                    )}
                  </div>
                  {post.caption && (
                    <p className='text-dark-75 font-size-lg font-weight-normal pt-5 mb-2 '>
                      {post.caption}
                    </p>
                  )}
                </>
              ) : post.type === 'MILESTONE' ? (
                <>
                  <div className='bgi-no-repeat bgi-size-cover rounded JG__blog-photo overflow-hidden d-flex align-items-center justify-content-center'>
                    {post.photo && (
                      <S3Image photo={post.photo[0]} min-width='100%' />
                    )}
                  </div>
                  {post.caption && (
                    <>
                      <h1 className='text-dark-75 font-size-xxlg font-weight-normal pt-5 mb-2'>
                        {post.caption}
                      </h1>
                      <p className='text-dark-75 font-size-xlg font-weight-normal pt-5 mb-2'>
                        {post.createdAt &&
                          moment(post.createdAt)
                            .startOf('day')
                            .fromNow()}
                      </p>
                    </>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
