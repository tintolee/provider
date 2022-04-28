import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, connect, useDispatch } from 'react-redux';
import Select from 'react-select';
import { Image } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhotoPicker } from 'aws-amplify-react';
import { ModalProgressBar } from '../../../_metronic/_partials/controls';
import { toAbsoluteUrl } from '../../../_metronic/_helpers';
import { resizeFile } from '../../utils/FileResizer';
import * as auth from '../Auth';
import * as actions from './_redux/providers/providersActions';
import * as providerSectorsActions from './_redux/providerSectors/providerSectorsActions';
import ImageS3 from  "../../../app/components/Images/S3Image";

function EditInformation(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const { providerForEdit, providerSectors } = useSelector(
    (state) => ({
      providerForEdit: state.providers.providerForEdit,
      // actionsLoading: state.providers.actionsLoading,
      providerSectors: state.providerSectors.entities,
    }),
    shallowEqual
  );

  const uploadFile= async (filedata)=>{
    let formData = new FormData();
    formData.append("file", filedata);
    formData.append("upload_preset", "r4v1flgt");
    const options = {
      method: "POST",
      body: formData,
    };
   const upload =  await fetch("https://api.Cloudinary.com/v1_1/drt1ulcak/image/upload", options)
      .then((res) => res.json())
      .then((res) =>  res.secure_url)
      .catch((err) => console.log(err));
      return upload
  }

  useEffect(() => {
    dispatch(providerSectorsActions.fetchOpportunityProviderSectors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.fetchProvider(user.providerId));
  }, [user.providerId, dispatch]);

  // Methods
  const saveUser = async (values, setStatus, setSubmitting) => {
    setloading(true);
    const updatedProvider = Object.assign(user, values);
    // console.log(values);
    if (updatedProvider.id) {
      const input = {
        id: updatedProvider.id,
        name: updatedProvider.name,
        displayName: updatedProvider.displayName,
        tagline: updatedProvider.tagline,
        phone: updatedProvider.phone,
        email: updatedProvider.email,
        website: updatedProvider.website,
        address: updatedProvider.address,
        opportunityProviderPrimarySectorId: updatedProvider.primarySector.id,
      };

      if (updatedProvider.logo) {
    const uploadedFile = await uploadFile(imagePreview)
        input.logo = uploadedFile
      }
      console.log(input)

      dispatch(actions.updateProvider(input))
        .then(() => {
          setloading(false);
          setSubmitting(false);
        })
        .catch((error) => {
          setStatus(error);
          setloading(false);
          setSubmitting(false);
        });
    }
  };

  // UI Helpers
  const initialValues = {
    id: undefined,
    logo: null,
    name: '',
    displayName: '',
    tagline: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    primarySector: {
      id: undefined,
    },
  };

  const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    displayName: Yup.string().required('Display name is required'),
    tagline: Yup.string(),
    address: Yup.string(),
    phone: Yup.string(),
    email: Yup.string()
      .email('Wrong email format')
      .required('Email is required'),
    website: Yup.string(),
    primarySector: Yup.object().shape({
      id: Yup.string().required('Primary Sector is required'),
    }),
    logo: Yup.mixed().required(),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid';
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid';
    }

    return '';
  };

  const onPhotoPickChange = async ({ file }, fieldName, callback) => {
    try {
      const config = {
        maxWidth: 200,
        maxHeight: 200,
        compressFormat: 'JPEG',
        quality: 90,
      };

      const image = await resizeFile(file, config);

      callback(fieldName, image);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: providerForEdit
      ? {
          ...initialValues,
          id: providerForEdit.id,
          name: providerForEdit.name,
          displayName: providerForEdit.displayName || initialValues.displayName,
          email: providerForEdit.email,
          tagline: providerForEdit.tagline || initialValues.tagline,
          phone: providerForEdit.phone || initialValues.phone,
          website: providerForEdit.website || initialValues.website,
          address: providerForEdit.address || initialValues.address,
          primarySector:
            providerForEdit.primarySector || initialValues.primarySector,
          logo: providerForEdit.logo || initialValues.logo,
        }
      : initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    // onReset: (values, { resetForm }) => {
    //   resetForm();
    // },
  });

  return (
    <form
      className='card card-custom card-stretch'
      onSubmit={formik.handleSubmit}
    >
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className='card-header py-3'>
        <div className='card-title align-items-start flex-column'>
          <h3 className='card-label font-weight-bolder text-dark'>
            Edit Information
          </h3>
          <span className='text-muted font-weight-bold font-size-sm mt-1'>
            Edit your company information
          </span>
        </div>
        <div className='card-toolbar'>
          <button
            type='submit'
            className='btn btn-primary mr-2'
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            Save Changes
            {formik.isSubmitting}
          </button>
          {/* <Link to='/company-profile' className='btn btn-danger'>
            Cancel
          </Link> */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className='form'>
        {/* begin::Body */}
        <div className='card-body'>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>Logo</label>
            <div className='col-lg-9 col-xl-6'>
              <div
                className='image-input image-input-outline'
                id='kt_profile_avatar'
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    '/media/users/blank.png'
                  )}`,
                }}
              >
                <div className='image-input-wrapper'>
                  {imagePreview ? (
                    <Image src={imagePreview} fluid />
                  ) : (
                    formik.values.logo && (

                      <ImageS3
                      className="card-img-top h-225px"
                      alt=" "
                      photo={formik.values.logo}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = toAbsoluteUrl(
                          "/media/routemap-media/false-post.jpg"
                        );
                      }}
                    />

                    )
                  )}
                </div>
                <PhotoPicker
                  title='Browse'
                  preview='hidden'
                  headerText='Logo'
                  onLoad={(url) => {
                    setImagePreview(url);
                  }}
                  onPick={(file) => {
                    onPhotoPickChange(file, 'logo', formik.setFieldValue);
                  }}
                  theme={{
                    photoImg: {
                      display: 'none',
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>Name</label>
            <div className='col-lg-9 col-xl-6'>
              <input
                type='text'
                placeholder='Name'
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  'name'
                )}`}
                name='name'
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='invalid-feedback'>{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>
              Display Name
            </label>
            <div className='col-lg-9 col-xl-6'>
              <input
                type='text'
                placeholder='Display name'
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  'displayName'
                )}`}
                name='displayName'
                {...formik.getFieldProps('displayName')}
              />
              {formik.touched.displayName && formik.errors.displayName ? (
                <div className='invalid-feedback'>
                  {formik.errors.displayName}
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>Tagline</label>
            <div className='col-lg-9 col-xl-6'>
              <input
                type='text'
                placeholder='Tagline'
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  'tagline'
                )}`}
                name='tagline'
                {...formik.getFieldProps('tagline')}
              />
              {formik.touched.tagline && formik.errors.tagline ? (
                <div className='invalid-feedback'>{formik.errors.tagline}</div>
              ) : null}
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>Address</label>
            <div className='col-lg-9 col-xl-6'>
              <input
                type='text'
                placeholder='Address'
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  'address'
                )}`}
                name='address'
                {...formik.getFieldProps('address')}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className='invalid-feedback'>{formik.errors.address}</div>
              ) : null}
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>
              Primary Sector
            </label>
            <div className='col-lg-9 col-xl-6'>
              <select
                className='form-control form-control-lg form-control-solid'
                name='primarySector.id'
                {...formik.getFieldProps('primarySector.id')}
              >
                <option key='' value=''>
                  Select...
                </option>
                {providerSectors.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>
              Other Sectors
            </label>
            <div className='col-lg-9 col-xl-6'>
              <Select
                isMulti
                name='otherSectors'
                isSearchable='true'
                options={providerSectors.map((sector) => ({
                  value: sector.id,
                  label: sector.name,
                }))}
                className='basic-multi-select form-control-solid'
                {...formik.getFieldProps('otherSectors')}
                onChange={(e) => {
                  formik.setFieldValue('otherSectors', e);
                }}
              />
            </div>
          </div>

          <div className='row'>
            <label className='col-xl-3'></label>
            <div className='col-lg-9 col-xl-6'>
              <h5 className='font-weight-bold mt-10 mb-6'>Contact Info</h5>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>
              Contact Phone
            </label>
            <div className='col-lg-9 col-xl-6'>
              <div className='input-group input-group-lg input-group-solid'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-phone'></i>
                  </span>
                </div>
                <input
                  type='text'
                  placeholder='+1(123)112-11-11'
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    'phone'
                  )}`}
                  name='phone'
                  {...formik.getFieldProps('phone')}
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <div className='invalid-feedback display-block'>
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>
              Email Address
            </label>
            <div className='col-lg-9 col-xl-6'>
              <div className='input-group input-group-lg input-group-solid'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-at'></i>
                  </span>
                </div>
                <input
                  type='email'
                  placeholder='Email'
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    'email'
                  )}`}
                  name='email'
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className='invalid-feedback display-block'>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-xl-3 col-lg-3 col-form-label'>
              Company Site
            </label>
            <div className='col-lg-9 col-xl-6'>
              <div className='input-group input-group-lg input-group-solid'>
                <input
                  type='text'
                  placeholder='Website'
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    'website'
                  )}`}
                  name='website'
                  {...formik.getFieldProps('website')}
                />
              </div>
              {formik.touched.website && formik.errors.website ? (
                <div className='invalid-feedback display-block'>
                  {formik.errors.website}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(EditInformation);
