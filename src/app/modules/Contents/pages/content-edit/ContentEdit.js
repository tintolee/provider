import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import * as actions from '../../_redux/contentsActions';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../_metronic/_partials/controls';
import { ContentEditForm } from './ContentEditForm';
import { useSubheader } from '../../../../../_metronic/layout';
import { Auth } from 'aws-amplify';
import { ModalProgressBar } from '../../../../../_metronic/_partials/controls';
import { useToasts } from 'react-toast-notifications';

let initContent = {
  id: undefined,
  title: '',
  type: 'Photo',
  description: '',
  blogTitle: '',
  blogDescription: '',
  blogCoverPhoto: null,
  visibility: 'public',
  photo: null,
  video: '',
  status: 1,
  opportunityProvider: {
    id: undefined,
  },
  createdBy: {
    id: undefined,
  },
};

export function ContentEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const { addToast } = useToasts();
  const suhbeader = useSubheader();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [percentUploaded, setPercentUploaded] = useState(0);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  const { actionsLoading, contentForEdit, user } = useSelector(
    (state) => ({
      actionsLoading: state.contents.actionsLoading,
      contentForEdit: state.contents.contentForEdit,
      user: state.auth.user,
    }),
    shallowEqual
  );


  const uploadFile= async (filedata)=>{
    let formData = new FormData();
    formData.append("file", filedata);
    formData.append("upload_preset", "ogy1h7v9");
    const options = {
      method: "POST",
      body: formData,
    };
   const upload =  await fetch("https://api.Cloudinary.com/v1_1/dw2c6c2hi/image/upload", options)
      .then((res) => res.json())
      .then((res) =>  res.secure_url)
      .catch((err) => console.log(err));
      return upload
  }

  useEffect(() => {
    initContent.opportunityProvider.id = user.providerId;
    initContent.createdBy.id = user.userId;
  }, [user.providerId, user.userId, dispatch]);

  useEffect(() => {
    dispatch(actions.fetchContent(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? '' : 'New Content';
    if (contentForEdit && id) {
      _title = `Edit Content: '${contentForEdit.title}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentForEdit, id]);

  const saveContent = async (values) => {
    setLoading(true);
    const input = {
      id: values.id,
      title: values.title,
      description: values.description,
      type: values.type,
      status: values.status,
      opportunityProviderId: values.opportunityProvider.id,
      opportunityProviderUserId: values.createdBy.id,
      video: '',
    };
    console.log('loggin type')
    console.log(values.type)

    if (values.type === 'Photo') {
      const visibility = 'provider';
      const { identityId } = await Auth.currentCredentials();
      console.log('photo typess')

     const uploadPhoto = await uploadFile(imagePreview)
      input.photo = uploadPhoto
    }

    if (values.type === 'Blog') {
      input.blog = {
        blogTitle: values.blogTitle,
        blogDescription: values.blogDescription,
        visibility: values.visibility,
      };

      if (values.blogCoverPhoto) {
        const uploadBlogCoverPhoto = await uploadFile(imagePreview)
        input.blog.blogCoverPhoto = uploadBlogCoverPhoto
      }
    }

    if (values.type === 'Video') {
      const uploadVideo = await uploadFile(imagePreview)
      input.video = uploadVideo;
    }


    if (!id) {
      dispatch(actions.createContent(input)).then(() => {
        setLoading(false);
        initContent = {
          id: undefined,
          title: '',  
          type: 'Photo',
          description: '',
          blogTitle: '',
          blogDescription: '',
          blogCoverPhoto: null,
          visibility: 'public',
          photo: null,
          video: '',
          status: 1,
          opportunityProvider: {
            id: undefined,
          },
          createdBy: {
            id: undefined,
          },
        };
        backToContentsList('created');
      });
    } else {
      dispatch(actions.updateContent(input)).then(() => {
        setLoading(false);
        initContent = {
          id: undefined,
          title: '',
          type: 'Photo',
          description: '',
          blogTitle: '',
          blogDescription: '',
          blogCoverPhoto: null,
          visibility: 'public',
          photo: null,
          video: '',
          status: 1,
          opportunityProvider: {
            id: undefined,
          },
          createdBy: {
            id: undefined,
          },
        };
        backToContentsList('saved');
      });
    }
  };

  const btnRef = useRef();
  const saveContentClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToContentsList = (state) => {
    addToast(`Content ${state}`, {
      appearance: 'success',
    });
    history.push(`/contents`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          {loading ? (
            <div className='spinner spinner-primary mr-10'></div>
          ) : (
            <>
              <button
                type='button'
                onClick={backToContentsList}
                className='btn btn-light'
              >
                <i className='fa fa-arrow-left'></i>
                Back
              </button>
              {`  `}
              <button
                type='submit'
                className='btn btn-primary ml-2'
                onClick={saveContentClick}
              >
                Save
              </button>
            </>
          )}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className='mt-5'>
          <ContentEditForm
            actionsLoading={actionsLoading}
            content={contentForEdit || initContent}
            btnRef={btnRef}
            saveContent={saveContent}
            percentUploaded={percentUploaded}
            imagePreview ={imagePreview}
            setImagePreview ={setImagePreview}
          />
        </div>
      </CardBody>
    </Card>
  );
}
