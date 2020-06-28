import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import { privateSalesInquire } from '../actions';
import sendAnalytics from '../../../utils/sendAnalytics';

const handleAnalytics = ({ auctionLotPublicId = 0, eventType = 'click', lotNumber, saleNumber }) => {
  const eventAction = saleNumber === 'EX080519'
    ? eventType === 'click'
      ? 'Inquire - Perpetual Store'
      : 'Inquiry Submission - Perpetual'
    : eventType === 'click'
      ? 'Inquire - Private Sales'
      : 'Inquiry Submission - Private Sales';
  const eventLabel = saleNumber === 'EX080519'
    ? `Perpetual - ${auctionLotPublicId}`
    : eventType === 'click'
      ? `Private Sales - ${saleNumber} ${lotNumber}`
      : `Private Sales Inquiry Submission - ${saleNumber} ${lotNumber}`;
  sendAnalytics({
    eventCategory: 'Bid Button',
    eventAction,
    eventLabel
  });
};

const Form = ({ description, errorMsg, makerName, onSubmit, saleNumber, userLoggedIn }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = serialize(e.target, true);
    onSubmit(data);
  };
  const formTitle = saleNumber.toUpperCase() === 'EX080519' ? 'Perpetual Inquiry' : 'Private Sales Inquiry';
  const formDescription = saleNumber.toUpperCase() === 'EX080519'
    ? `Thank you for your interest in ${description} by ${makerName}. Please add any comments below, and our Watches team will follow up with you shortly.`
    : `Thank you for your interest in ${description} by ${makerName}. Please add any comments below, and our Private Sales team will follow up with you shortly.`;
  return (
    <form
      onSubmit={handleSubmit}
      className="user-form--private-sales__form"
      name="private-sales-inquiry"
    >
      {errorMsg.length > 0
        ? <p className="user-form__message user-form__message--red">{errorMsg}</p>
        : null
      }
      <h2 className="user-form__title user-form--private-sales__title">{formTitle}</h2>
      <p className="user-form__message">{formDescription}</p>
      {!userLoggedIn
        ? (
          <Fragment>
            <input
              type="text"
              name="name"
              className="user-form__form__input"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              className="user-form__form__input"
              placeholder="Email"
              required
            />
          </Fragment>
        )
        : null
      }
      <textarea
        className="user-form--private-sales__form__textarea"
        id="comments"
        name="comments"
        placeholder="Comments"
        rows={4}
      />
      <input type="submit" value="Inquire" className="user-form--private-sales__form__submit" />
    </form>
  );
};

Form.propTypes = {
  description: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
  makerName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saleNumber: PropTypes.string.isRequired,
  userLoggedIn: PropTypes.bool.isRequired
};

const InquireForm = ({ auctionLotPublicId, formOpen, lotNumber, saleNumber, description, makerName, isMobile }) => {
  const { user, inquireForm } = useSelector(({ user, inquireForm }) => ({ user, inquireForm }));
  const dispatch = useDispatch();
  const [isOpen, toggleHeight] = useState(formOpen);
  useEffect(() => {
    if (isOpen && isMobile) { toggleHeight(!isOpen); }
  }, [lotNumber]);
  const handleToggle = () => {
    handleAnalytics({ auctionLotPublicId, eventType: 'click', lotNumber, saleNumber });
    toggleHeight(!isOpen);
  };
  const handleSubmit = (formData) => {
    const payload = {
      email: user.email,
      ...formData,
      lotNumber,
      saleNumber
    };
    dispatch(privateSalesInquire(payload));
  };
  if (inquireForm.status === 'success') {
    handleAnalytics({ eventType: 'submit', lotNumber, saleNumber });
  }
  const errorMsg = inquireForm.status === 'error'
    && inquireForm.message.length > 0
    ? inquireForm.message
    : '';
  return (
    <div className={classNames('user-form user-form--private-sales', {
      'user-form--private-sales--desktop': !isMobile,
      'user-form--private-sales--close': !isOpen && isMobile
    })}
    >
      {inquireForm.status === 'pending' || inquireForm.status === 'success'
        ? (
          <div
            className={classNames('user-form--private-sales__status-bar', {
              'user-form__loading': inquireForm.status === 'pending'
            })}
          >
            {inquireForm.message}
          </div>
        )
        : (
          <Fragment>
            {
              !isOpen && isMobile
                ? (
                  <button
                    className="user-form--private-sales__button"
                    onClick={handleToggle}
                    type="button"
                  >
                    Inquire
                  </button>
                )
                : null
            }
            <Form
              auctionLotPublicId={auctionLotPublicId}
              description={description}
              onSubmit={handleSubmit}
              makerName={makerName}
              errorMsg={errorMsg}
              saleNumber={saleNumber}
              userLoggedIn={user.loggedIn}
            />
          </Fragment>
        )
      }
    </div>
  );
};

InquireForm.defaultProps = {
  auctionLotPublicId: 0,
  formOpen: false,
  isMobile: false
};
InquireForm.propTypes = {
  auctionLotPublicId: PropTypes.number,
  description: PropTypes.string.isRequired,
  formOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  lotNumber: PropTypes.number.isRequired,
  makerName: PropTypes.string.isRequired,
  saleNumber: PropTypes.string.isRequired
};

export default InquireForm;
