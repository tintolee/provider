import React from 'react';
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';
import { Card, CardBody } from '../../../../../_metronic/_partials/controls';
import ImageS3 from '../../../../components/Images/S3Image';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ContentsCard = ({ listLoading, entities }) => {
  return (
    <>
      {listLoading && (
        <div className='d-flex align-items-center justify-content-center w-100'>
          <div className='spinner spinner-primary mr-10'></div>
        </div>
      )}
      {entities && (
        <>
          {entities.map((entity, index) => (
            <div key={index} className='col-xl-4 col-lg-4'>
              <Card>
                <ImageS3
                  className='card-img-top h-225px'
                  alt=' '
                  photo={entity.photo   || entity?.blog?.blogCoverPhoto}
                  onError={(e) => {
                    e.target.onerror =   null;
                    e.target.src = toAbsoluteUrl(
                      '/media/routemap-media/false-post.jpg'
                    );
                  }}
                />
                <CardBody>
                  <div>
                    <div className='mb-10'>
                      <div className='font-size-xlg font-weight-bold'>
                        {entity.title}
                      </div>
                    </div>
                    <div>
                      <div className='row gx-5 mb-3'>
                        <div className='font-size-md text-black-50 font-weight-bold col'>
                          Date Created
                        </div>
                        <div className='font-size-md font-weight-bold col'>
                          {moment(entity.createdAt).format('L, LT')}
                        </div>
                      </div>
                      <div className='row gx-5 mb-3'>
                        <div className='font-size-md text-black-50 font-weight-bold col'>
                          Type
                        </div>
                        <div className='font-size-md font-weight-bold col'>
                          {entity.type}
                        </div>
                      </div>
                      <div className='row gx-5 mb-3'>
                        <div className='font-size-md text-black-50 font-weight-bold col'>
                          Feedbacks
                        </div>
                        <div className='font-size-md font-weight-bold col'>
                          {entity.positiveFeedbacks.items.length}
                        </div>
                      </div>
                      <div className='row gx-5 mb-3'>
                        <div className='font-size-md text-black-50 font-weight-bold col'>
                          Status
                        </div>
                        <div className='font-size-sm font-weight-bold col'>
                          {entity.status === 1 ? (
                            <span
                              className='bg-success px-2 py-1 text-white bg-opacity-75 rounded-1'
                              style={{ borderRadius: '3px' }}
                            >
                              Active
                            </span>
                          ) : (
                            <span
                              className='bg-danger px-2 py-1 text-white bg-opacity-75 rounded-1'
                              style={{ borderRadius: '3px' }}
                            >
                              Archive
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='row gx-5 mb-3'>
                        <div className='font-size-lg text-black-50 font-weight-bold col'>
                          Actions
                        </div>
                        <div className='font-size-sm font-weight-bold col'>
                          <div className='d-flex'>
                            <Link to={`/contents/${entity.id}/edit`}>
                              <span
                                className='px-2 py-1 text-white bg-opacity-75 rounded-1'
                                style={{
                                  backgroundColor: '#f89534',
                                  borderRadius: '3px',
                                }}
                              >
                                Edit
                              </span>
                            </Link>
                            <Link to={`/contents/${entity.id}/updateStatus`}>
                              <span
                                className='px-2 py-1 text-white bg-opacity-75 rounded-1'
                                style={{
                                  backgroundColor: '#f89534',
                                  borderRadius: '3px',
                                  marginLeft: '10px',
                                }}
                              >
                                Archive
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ContentsCard;
