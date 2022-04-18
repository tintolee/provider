import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import * as actions from '../../_redux/seekers/seekersActions';
import { ProfileCard } from '../../components/ProfileCard';
import { useSeekersUIContext } from '../SeekersUIContext';

export function SeekersList() {
  const seekeersUIContext = useSeekersUIContext();
  const seekersUIProps = useMemo(() => {
    return {
      ids: seekeersUIContext.ids,
      setIds: seekeersUIContext.setIds,
      queryParams: seekeersUIContext.queryParams,
      setQueryParams: seekeersUIContext.setQueryParams,
      providerId: seekeersUIContext.providerId,
    };
  }, [seekeersUIContext]);

  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.followers }),
    shallowEqual
  );
  const { entities, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    seekersUIProps.setIds([]);
    dispatch(
      actions.fetchFollowers(
        seekersUIProps.queryParams,
        seekersUIProps.providerId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seekersUIProps.queryParams, dispatch, seekersUIProps.providerId]);

  if (listLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center w-100'>
        <Spinner animation='border' variant='primary' />;
      </div>
    );
  }

  return (
    <>
      {entities &&
        entities.map((item, index) => (
          // console.log(item)
          <ProfileCard
            key={`ki${index}`}
            seeker={item.seeker}
            ids={seekersUIProps.ids}
            setIds={seekersUIProps.setIds}
            index={index}
            followingStarted={item.startedAt}
          />
        ))}
    </>
  );
}
