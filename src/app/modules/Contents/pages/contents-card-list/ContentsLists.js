import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../_redux/contentsActions';
import { useContentsUIContext } from '../ContentsUIContext';
import ContentsCard from './ContentsCard';

const ContentsLists = () => {
  const contentsUIContext = useContentsUIContext();
  const contentsUIProps = useMemo(() => {
    return {
      providerId: contentsUIContext.providerId,
      ids: contentsUIContext.ids,
      setIds: contentsUIContext.setIds,
      queryParams: contentsUIContext.queryParams,
      setQueryParams: contentsUIContext.setQueryParams,
      openEditContentPage: contentsUIContext.openEditContentPage,
      openUpdateContentStatusDialog:
        contentsUIContext.openUpdateContentStatusDialog,
    };
  }, [contentsUIContext]);

  // Getting curret state of contents list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.contents }),
    shallowEqual
  );

  const { entities, listLoading } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(
      actions.fetchContents(
        contentsUIProps.queryParams,
        contentsUIProps.providerId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentsUIProps.queryParams, dispatch]);

  return (
    <div>
      <div className='row'>
        <ContentsCard entities={entities} listLoading={listLoading} />
      </div>
    </div>
  );
};

export default ContentsLists;
