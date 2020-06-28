import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import classNames from 'classnames';
import { isEqual, map, remove, forEach, has, find } from 'lodash/fp';
import { Typeahead } from 'react-typeahead';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import SignUpForm from '../PhillipsUser/Forms/SignUpForm';
import NewsletterCheckbox from '../NewsletterSignup/Checkbox';
import {
  addImages,
  blurTypeahead,
  changeMedium,
  fetchMakers,
  makerSelected,
  resetForm,
  submitError,
  submitPending,
  submitSuccess
} from './actions';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import bindUserModel from '../PhillipsUser/bindUserModel';
import { loggedIn, createUser } from '../PhillipsUser/actions';
import loadImageFromFile from '../utils/loadImageFromFile';
import { required } from '../utils/formValidations';
import sendAnalytics from '../../utils/sendAnalytics';
import consignmentService from '../services/ConsignmentService';
import newsletterService from '../services/NewsletterService';
import { consignmentFormDefaultState, getSelectedMaker } from './getInitialState';
import content from './content.json';

const scroll = Scroll.animateScroll;
const scrollE = Scroll.Events;
const successMsg = (lang, name, makerName, title) => {
  const message = lang.toUpperCase() === 'CH'
    ? makerName === undefined
      ? `你好${name}，感謝閣下提供 <em>${title}</em> 之資料，以作拍品徵集用途。專家將在未來五個工作日內與您聯繫。`
      : `你好${name}，感謝 閣下提供 ${makerName} 的 <em>${title}</em> 之資料，以作拍品徵集用途。专家将在未来五个工作日内与您联系。`
    : makerName === undefined
      ? `${name}, thank you for submitting <em>${title}</em> for consignment. A specialist will be in touch with you within the next 5 days.`
      : `${name}, thank you for submitting ${makerName}'s <em>${title}</em> for consignment. A specialist will be in touch with you within the next 5 days.`;
  return message;
};

const mapStateToProps = ({ form, user, userForm, makers, selectedMaker, language }, { countries, mediums }) => {
  return {
    countries,
    form,
    language,
    makers,
    mediums,
    selectedMaker,
    user,
    userForm
  };
};
class ConsignmentForm extends Component {
  constructor(props) {
    super(props);
    this.handleMediumChange = this.handleMediumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleAccountSignup = this.handleAccountSignup.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    scrollE.scrollEvent.register('end', () => {
      dispatch(makerSelected(getSelectedMaker()));
    });
    getPhillipsBackboneProperty('user')
      .then((userModel) => {
        bindUserModel(userModel, dispatch);
        if (userModel.loggedIn) {
          dispatch(loggedIn(userModel.toJSON()));
        }
      })
      .catch(err => console.error('Error fetching user:', err));
  }

  componentWillUnmount() {
    scrollE.scrollEvent.remove('end');
  }

  handleMediumChange(e) {
    this.props.dispatch(changeMedium(parseInt(e.target.value, 10)));
  }

  handleAccountSignup(payload) {
    this.props.dispatch(createUser(payload));
    // registerUser(data)
    //   .then((res) => {
    //     showResponse({ status: 'success', 'message': `Thank you for joining Phillips Digital, ${res.firstName}` });
    //   })
    //   .catch(({ message = '' }) => {
    //     showResponse({ status: 'error', message });
    //   })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, countries, language } = this.props;
    const isChinese = language.toUpperCase() === 'CH';
    const getCountryId = countryDesc => find(c => countryDesc === c.countryDesc)(countries) || null;
    const formData = serialize(e.target, { hash: true });
    const mediumId = parseInt(formData.mediumId, 10);
    const { files, email, title } = form;
    const formPayload = {
      ...formData,
      mediumId,
      makerId: (formData.makerName === undefined) ? 0 : formData.makerId,
      countryID: isChinese
        ? null
        : getCountryId(formData.location)?.countryID,
      fileData: {
        files,
        email,
        title
      }
    };
    this.props.dispatch(submitPending());
    // promise call back hellconsider generators
    this.validateForm()
      .then(() => {
        consignmentService.postImages(formPayload.fileData)
          .then(({ consignmentId, imagePaths }) => {
            consignmentService.postData({
              ...formPayload,
              consignmentId,
              imagePaths,
              isPrivate: Boolean(this.props.isPrivate)
            })
              .then(() => {
                this.props.dispatch(resetForm());
                sendAnalytics({
                  eventCategory: `Consignment Page / Sell-${this.props.language.toUpperCase()}`,
                  eventAction: 'Submitted Consignment',
                  eventLabel: `Maker: ${formData.makerName}`
                });
                if (formData.sendNewsLetter) {
                  newsletterService.saveEmailToNewsletter({ email: formData.email })
                    .then(() => {
                      sendAnalytics({
                        hitType: 'event',
                        eventCategory: 'newsletter subscribe consignment page',
                        eventAction: 'newsletter subscribe',
                        eventLabel: `Email ${formData.email}`
                      });
                      this.props.dispatch(submitSuccess({
                        message: successMsg(
                          this.props.language,
                          formData.name,
                          formData.makerName,
                          formData.title
                        ),
                        user: {
                          email: formData.email,
                          name: formData.name
                        }
                      }));
                    })
                    .catch(err => console.log('error subscribing to newsletter: ', err));
                } else {
                  this.props.dispatch(submitSuccess({
                    message: successMsg(
                      this.props.language,
                      formData.name,
                      formData.makerName,
                      formData.title
                    ),
                    user: {
                      email: formData.email,
                      name: formData.name
                    }
                  }));
                  scroll.scrollToTop({
                    smooth: true,
                    duration: 500
                  });
                }
              })
              .catch((error) => {
                this.props.dispatch(submitError({
                  message: error.message
                }));
              });
          })
          .catch((error) => {
            console.error('Error saving form', error);
            this.props.dispatch(submitError({
              message: error.message
            }));
          });
      })
      .catch((ref) => {
        console.log('catch ref: ', ref);
        this.props.dispatch(submitError({
          message: ref.title
        }));
      });
  }

  resetForm() {
    this.props.dispatch(resetForm());
  }

  addImages(fileList) {
    if (fileList.length > 6 || this.props.form.files.length + fileList.length > 6) {
      this.props.dispatch(submitError({
        message: 'You can only upload 6 images'
      }));
    } else {
      const files = [...this.props.form.files, ...map(file => file)(fileList)];
      const imagesPromises = map(file => new Promise((resolve, reject) => {
        loadImageFromFile(file, e => resolve(e.target.result), err => reject(err));
      }))(files);
      Promise.all(imagesPromises)
        .then(images => this.props.dispatch(addImages({ images, files })))
        .catch(error => console.error('ERROR LOADING IMAGES:', error));
    }
    return this;
  }

  removeFile(indexToRemove) {
    const removeByIndex = list => remove(item => isEqual(list[indexToRemove], item))(list);
    const [files, images] = [removeByIndex(this.props.form.files), removeByIndex(this.props.form.images)];
    this.props.dispatch(addImages({ files, images }));
  }

  validateForm() {
    const validateNum = (val) => {
      return !isNaN(parseInt(val, 10)) && val > 0;
    };
    const validateLength = (val) => {
      const bool = Boolean(required(val));
      return bool;
    };
    const promise = new Promise((resolve, reject) => {
      let valid = true;
      let requiredFields = [
        this.emailInput,
        this.nameInput,
        this.makerInput,
        this.titleInput,
        this.circaInput,
        this.locationInput,
        this.mediumSelect
      ];
      // watches and jewels
      if (this.props.form.mediumId !== 8 && this.props.form.mediumId !== 9) {
        requiredFields.push(this.sizeInput);
      }
      // jewels
      if (this.props.form.mediumId === 9) {
        requiredFields = requiredFields.filter((ref) => {
          if (ref.name === 'makerId') {
            return false;
          }
          if (ref.name === 'circa') {
            return false;
          }
          return true;
        });
      }
      forEach((ref) => {
        if (ref.name === 'mediumId' || ref.name === 'makerId') {
          valid = validateNum(ref.value);
          if (!valid) {
            reject(ref);
            return false;
          }
        } else {
          valid = validateLength(ref.value);
          if (!valid) {
            reject(ref);
            return false;
          }
        }
        return valid;
      })(requiredFields);
      if (valid) {
        resolve(valid);
      }
    });
    return promise;
  }

  render() {
    const { countries, language } = this.props;
    const isChinese = language.toUpperCase() === 'CH';
    const mediumLangProp = isChinese ? 'cMedium' : 'medium';
    let { consignmentForm } = content[language];
    consignmentForm = Object.keys(this.props).reduce((res, key) => {
      if (has(key)(consignmentForm)) {
        res[key] = this.props[key];
      }
      return res;
    }, consignmentForm);
    const { placeholders } = consignmentForm;
    return (
      <DropZone
        accept="image/*"
        disableClick
        disablePreview
        onDrop={acceptedFiles => this.addImages(acceptedFiles)}
        style={{}}
      >
        <div className="consignment-form uac-form" id="consignment-form">
          <h2>
            {this.props.form.success.display
              ? consignmentForm.stateMessages.successHeadline
              : consignmentForm.formTitle
            }
          </h2>
          {this.props.form.success.display
            ? (
              <div className={classNames('consignment-success row')}>
                <p dangerouslySetInnerHTML={{ __html: this.props.form.success.message }} />
                <button
                  type="button"
                  onClick={this.resetForm}
                >
                  {consignmentForm.stateMessages.submitAnother}
                </button>
              </div>
            )
            : (<p className="consignment-form__p consignment-form__p--eleven-px">{consignmentForm.secondaryMktNote}</p>)
          }
          {this.props.form.success.display
            ? this.props.user.loggedIn
              ? null
              : (
                <SignUpForm
                  classNames="user-form--consignment"
                  onSubmit={this.handleAccountSignup}
                  {...this.props.user}
                  userForm={this.props.userForm}
                />
              )
            : (
              <form
                className={classNames('form-horizontal clearfix', { hidden: this.props.form.success.display })}
                onSubmit={this.handleSubmit}
                onBlur={() => this.props.dispatch(blurTypeahead())}
              >
                <p className={classNames('consignment-form__p consignment-form__p--eleven-px consignment-form__p--align-right',
                  { 'consignment-form__p--hidden': this.props.form.mediumId === 9 || this.props.form.mediumId === 8 })}
                >
                  {consignmentForm.allFieldsRequired}
                </p>
                <div>
                  <input
                    type="text"
                    name="name"
                    defaultValue={this.props.user.name}
                    placeholder={placeholders.name}
                    title={consignmentForm.errorMsg.name}
                    ref={(c) => { this.nameInput = c; }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={this.props.user.email}
                    placeholder={placeholders.email}
                    title={consignmentForm.errorMsg.email}
                    ref={(c) => { this.emailInput = c; }}
                  />
                </div>
                <div>
                  <select
                    name="mediumId"
                    placeholder={placeholders.medium}
                    onChange={this.handleMediumChange}
                    title={consignmentForm.errorMsg.medium}
                    ref={(c) => { this.mediumSelect = c; }}
                  >
                    <option className="placeholder">{placeholders.medium}</option>
                    {this.props.mediums.map(m => (
                      <option value={m.mediumId}>
                        {m[mediumLangProp]}
                      </option>))
                    }
                  </select>
                </div>
                <Typeahead
                  name="makerName"
                  classNames="maker-typeahead"
                  options={this.props.makers}
                  displayOption="makerName"
                  value={this.props.form.mediumId === 9 ? '' : this.props.selectedMaker.makerName}
                  filterOption={(inputValue, option) => {
                    if (option.makerName.includes(inputValue)) {
                      return option.makerName;
                    } else {
                      return 'No Artist';
                    }
                  }}
                  // onBlur={(e) => {
                  //   if (this.props.selectedMaker.makerName !== e.target.value) {
                  //     this.typeaheadInput.current.refs.entry.value = ' hello hello ';
                  //     console.log(this.typeaheadInput.current.refs.entry.value);
                  //     this.props.dispatch(makerSelected(getSelectedMaker()));
                  //   }
                  // }}
                  maxVisible={12}
                  inputProps={{
                    autoComplete: 'off',
                    id: 'typeahead-input'
                  }}
                  placeholder={
                    `${placeholders.artistMaker}${this.props.form.mediumId === 9 ? placeholders.optional : ''}`
                  }
                  onKeyUp={({ which, target }) => {
                    if (which === 9) {
                      return;
                    }
                    if (target.value.length > 2) {
                      const { value } = target;
                      this.props.dispatch(fetchMakers(value));
                    }
                  }}
                  onOptionSelected={(opt) => {
                    if (opt.makerId !== -1) {
                      this.props.dispatch(makerSelected(opt));
                    }
                  }}
                  customListComponent={
                    props => this.props.makers.length > 0 && props.options.length > 0
                      ? (
                        <ul className="typeahead-selector">
                          {props.options.map((opt, i) => {
                            return (
                              <li
                                className={classNames("typeahead-option", { 'typeahead-option--selected': i === props.selectionIndex })}
                                onMouseDown={(e) => {
                                  if (opt.makerId === -1) {
                                    e.preventDefault();
                                  }
                                  if (opt.makerId !== -1) {
                                    props.onOptionSelected(opt);
                                  }
                                }}
                              >
                                {props.displayOption(opt)}
                              </li>
                            );
                          })}
                        </ul>
                      )
                      : null
                  }
                  inputDisplayOption={({ makerId, makerName }) => makerId === -1 ? '' : makerName}
                />
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder={placeholders.title}
                    title={consignmentForm.errorMsg.title}
                    ref={(input) => { this.titleInput = input; }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="circa"
                    placeholder={this.props.form.mediumId !== 9 ? placeholders.year : `${placeholders.year}${placeholders.optional}`}
                    validations={this.props.form.mediumId !== 9
                      ? [required]
                      : null
                    }
                    title={consignmentForm.errorMsg.year}
                    ref={(c) => { this.circaInput = c; }}
                  />
                </div>
                <div>
                  {isChinese
                    ? (
                      <input
                        type="text"
                        name="location"
                        placeholder={placeholders.location}
                        title={consignmentForm.errorMsg.location}
                        ref={(c) => { this.locationInput = c; }}
                      />
                    )
                    : (
                      <select
                        ref={(c) => { this.locationInput = c; }}
                        name="location"
                        title={consignmentForm.errorMsg.location}
                      >
                        <option value="">Country where work is located</option>
                        {countries.map(c => <option value={c.countryDesc}>{c.countryDesc}</option>)}
                      </select>
                    )
                  }
                </div>
                <div>
                  <input
                    type="text"
                    name="size"
                    placeholder={(this.props.form.mediumId !== 8 && this.props.form.mediumId !== 9) ? placeholders.dimension : `${placeholders.dimension}${placeholders.optional}`}
                    validations={(this.props.form.mediumId !== 8 && this.props.form.mediumId !== 9) ? [required] : null}
                    title={(this.props.form.mediumId !== 8 && this.props.form.mediumId !== 9) ? consignmentForm.errorMsg.dimension : ''}
                    ref={(c) => { this.sizeInput = c; }}
                  />
                </div>
                <textarea
                  name="description"
                  placeholder={
                    (this.props.form.mediumId !== 8)
                      ? placeholders.additionalDetails
                      : placeholders.watchDetails
                  }
                />
                <p className="upload-photos">{consignmentForm.uploadPhotos}</p>
                <div className="multiple-image-input">
                  <div className="thumbnails row">
                    {this.props.form.images.map((image, index) => {
                      const deleteThumbnail = (e) => {
                        e.preventDefault();
                        this.removeFile(index);
                      };
                      return (
                        <div className="thumbnail">
                          <button
                            className="thumbnail-delete"
                            onClick={deleteThumbnail}
                          >
                            &#10006;
                          </button>
                          <img src={image} alt="upload thumbnail" title="upload thumbnail" />
                        </div>
                      );
                    })}
                  </div>
                  <label htmlFor="images" className="consignment-form__label">{consignmentForm.buttonLabels.photos}</label>
                  <input
                    onChange={({ target }) => this.addImages(target.files)}
                    className="hidden"
                    id="images"
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                  />
                </div>
                {this.props.user.loggedIn || isChinese
                  ? null
                  : <NewsletterCheckbox />
                }
                <button type="submit" ref={(c) => { this.submitBtn = c; }}>
                  {this.props.form.requestPending
                    ? consignmentForm.stateMessages.submitting
                    : consignmentForm.buttonLabels.submitLabel
                  }
                </button>
                <input
                  type="hidden"
                  className="hidden"
                  name="makerId"
                  value={this.props.selectedMaker.makerId}
                  ref={(c) => { this.makerInput = c; }}
                  title={consignmentForm.errorMsg.artistMaker}
                />
                <input
                  type="hidden"
                  className="hidden"
                  name="makerName"
                  value={this.props.selectedMaker.makerName}
                />
                <input
                  type="hidden"
                  className="hidden"
                  name="language"
                  value={language.toUpperCase()}
                />
                <p className={classNames('error-message', { hidden: !this.props.form.error.display })}>
                  {this.props.form.error.message}
                </p>
              </form>
            )
          }
        </div>
      </DropZone>
    );
  }
}

ConsignmentForm.defaultProps = {
  isPrivate: false,
  selectedMaker: {
    makerId: 0,
    makerName: '',
    url: '',
    birthDeath: ''
  }
};

ConsignmentForm.propTypes = {
  form: PropTypes.shape(consignmentFormDefaultState).isRequired,
  dispatch: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool,
  blurTypeahead: PropTypes.func.isRequired,
  fetchMakers: PropTypes.func.isRequired,
  makerSelected: PropTypes.func.isRequired,
  selectedMaker: PropTypes.objectOf({
    makerId: PropTypes.number,
    makerName: PropTypes.string,
    url: PropTypes.string,
    birthDeath: PropTypes.string
  }),
  language: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  userForm: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  makers: PropTypes.arrayOf(PropTypes.objectOf({
    maker: PropTypes.string,
    makerId: PropTypes.number
  })).isRequired,
  mediums: PropTypes.arrayOf(PropTypes.objectOf({
    medium: PropTypes.string,
    mediumId: PropTypes.number
  })).isRequired
};

export default connect(mapStateToProps)(ConsignmentForm);
