/* global ga fbq */

const getFbqEventName = (eventAction = '') => {
  switch (eventAction) {
    case 'Inquiry Submission - Private Sales':
      return '<Private_Sales_Inquiry_Submission>';
    case 'Inquiry Submission - Perpetual':
      return '<Perpetual_Inquiry_Submission>';
    case 'Inquire - Private Sales':
      return '<Private_Sales_Inquire>';
    case 'Inquire - Perpetual Store':
      return '<Perpetual_Inquire>';
    case 'Signed Up':
      return '<Account_Creation>';
    case 'Favorite Lot':
      return '<Favorite_Lots>';
    case 'Follow Maker':
      return '<Follow_Maker>';
    case 'Logged In':
      return '<Logged_In>';
    case 'Submitted Consignment':
      return '<Consignment_Submission>';
    case 'newsletter subscribe':
      return '<Email_Newsletter_Submission>';
    default:
      return '';
  }
};

function sendAnalytics({ eventCategory, eventAction, eventLabel, eventValue = 0 }) {
  if (typeof ga !== 'undefined') {
    ga('send', {
      hitType: 'event',
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    });
  }
  if (typeof fbq !== 'undefined' && getFbqEventName(eventAction).length > 0) {
    fbq('trackCustom', getFbqEventName(eventAction), {
      content_category: eventCategory, content_name: eventAction, content_label: eventLabel
    });
  }
}

export default sendAnalytics;
