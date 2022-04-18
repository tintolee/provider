import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../_metronic/_partials/controls';
import { ContentsFilter } from './contents-filter/ContentsFilter';
import { ContentsTable } from './contents-table/ContentsTable';
import { useContentsUIContext } from './ContentsUIContext';

export function ContentsCard() {
  const contentsUIContext = useContentsUIContext();
  const contentsUIProps = useMemo(() => {
    return {
      ids: contentsUIContext.ids,
      queryParams: contentsUIContext.queryParams,
      setQueryParams: contentsUIContext.setQueryParams,
      newContentButtonClick: contentsUIContext.newContentButtonClick,
      openEditContentPage: contentsUIContext.openEditContentPage,
      openFetchContentsDialog: contentsUIContext.openFetchContentsDialog,
      openUpdateContentStatusDialog:
        contentsUIContext.openUpdateContentStatusDialog,
    };
  }, [contentsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.contents }),
    shallowEqual
  );

  const { entities, listLoading } = currentState;

  return (
    <Card>
      <CardHeader title='Contents'>
        <CardHeaderToolbar>
          <button
            type='button'
            className='btn btn-primary'
            onClick={contentsUIProps.newContentButtonClick}
          >
            New Content
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {listLoading ? <div></div> : <ContentsFilter />}
        {/* <ContentsTable /> */}
      </CardBody>
    </Card>
  );
}
