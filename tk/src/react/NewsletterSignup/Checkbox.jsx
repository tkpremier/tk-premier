import React from 'react';

const NewsletterSignUpCheckbox = props => (
  <div className="phillips-newsletter-checkbox">
    <div className="phillips-newsletter-checkbox__wrapper">
      <input type="checkbox" name="sendNewsLetter" id="sendNewsLetter" />
      <label className="check-box" htmlFor="sendNewsLetter" />
      <label htmlFor="sendNewsLetter">
        <p className="phillips-newsletter-checkbox__label">
          Would you like to receive emails from Phillips about our upcoming auctions, exhibitions and special events?
        </p>
      </label>
    </div>
    <div className="phillips-newsletter-checkbox__reminder">
      <p>You can update your email preferences or unsubscribe at any time from your account page.</p>
    </div>
  </div>
);

export default NewsletterSignUpCheckbox;