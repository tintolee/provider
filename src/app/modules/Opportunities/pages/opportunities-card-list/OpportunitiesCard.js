import React from 'react';
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';
import { Card, CardBody } from '../../../../../_metronic/_partials/controls';
import ImageS3 from '../../../../components/Images/S3Image';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';

const OpportunitiesCard = ({ listLoading, entities }) => {

  return (
    <>
      {listLoading ? (
        <div className='d-flex align-items-center justify-content-center w-100'>
          <div className='spinner spinner-primary mr-10'></div>
        </div>
      ) : ( 
        entities && (
          <>
            {entities.map((entity, index) => (
              <div key={index} className='col-xl-4 col-lg-4'>
                <Card>
                  <NavLink to={`/opportunities/${entity.id}/edit`}>
                    <ImageS3
                      className='card-img-top h-225px'
                      alt=' '
                      photo={entity.cover}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = toAbsoluteUrl(
                          '/media/routemap-media/false-post.jpg'
                        );
                      }}
                    />
                  </NavLink>
                  <CardBody>
                    <div>
                      <div className='mb-10'>
                        <NavLink to={`/opportunities/${entity.id}/edit`}>
                          <div className='font-size-xlg font-weight-bold text-dark text-hover-primary'>
                            {entity.title}
                          </div>
                        </NavLink>
                      </div>
                      <div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-md text-black-50 font-weight-bold col'>
                            Opportunity Type
                          </div>
                          <div className='font-size-md font-weight-bold col'>
                            {entity.opportunityType.name}
                          </div>
                        </div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-md text-black-50 font-weight-bold col'>
                            Date
                          </div>
                          <div className='font-size-md font-weight-bold col'>
                            {moment(entity.date).format('DD/MM/YYYY, LT')}
                          </div>
                        </div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-md text-black-50 font-weight-bold col'>
                            DeadLine
                          </div>
                          <div className='font-size-md font-weight-bold col'>
                            {moment(entity.applicationDeadline).format(
                              'DD/MM/YYYY, LT'
                            )}
                          </div>
                        </div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-md text-black-50 font-weight-bold col'>
                            Application Required
                          </div>
                          <div className='font-size-md font-weight-bold col'>
                            {entity.applicationRequired ? 'Yes' : 'No'}
                          </div>
                        </div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-md text-black-50 font-weight-bold col'>
                            Location
                          </div>
                          <div className='font-size-md font-weight-bold col'>
                            {entity.location}
                          </div>
                        </div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-md text-black-50 font-weight-bold col'>
                            Attendees
                          </div>
                          <div className='font-size-md font-weight-bold col'>
                            {entity.attendees.items.length}
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
                                Not active
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='row gx-5 mb-3'>
                          <div className='font-size-lg text-black-50 font-weight-bold col'>
                            Actions
                          </div>
                          <div className='font-size-sm font-weight-bold col'>
                            <Link to={`/opportunities/${entity.id}/edit`}>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </>
        )
      )}
    </>
  );
};

export default OpportunitiesCard;
