import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import serialize from 'form-serialize';
import ConditionReportForm from './ConditionReportForm';
import ConditionReportRequest from './ConditionReportRequest';
import PhillipsModal from '../PhillipsModal/PhillipsModal';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import RequestService from '../services/RequestService';
import UserService from '../../services/UserService';

const requestService = new RequestService();
const userService = new UserService();

const ConditionReportPanel = (props) => {
  const condition = props.condition.split(/(?:\r\n|\r|\n)/g).map(p => {
    const paragraph = p.length > 0 ? (<p dangerouslySetInnerHTML={{ __html: p }} />) : null;
    return paragraph;
  });
  let contactForm = null;
  if (props.showModal) {
    contactForm = (
      <PhillipsModal hideModal={props.toggleModal}>
        <ConditionReportForm {...props} />
      </PhillipsModal>
    );
  }
  return (
    <div className="report panel">
      <a
        href="#"
        className={classNames('request-button show-report', { hidden: props.showReport })}
        onClick={props.toggleReport}
        rel="nofollow"
      >
        View Condition Report
      </a>
      <p
        className={classNames('disclaimer', { hidden: props.showReport })}
        style={{ marginTop: '10px', color: '#999', fontSize: '11px' }}
      >
        After viewing this condition report, a specialist may contact you to assist you with this lot.
      </p>
      <div className={classNames('cond-report', { show: props.showReport, hidden: !props.showReport })}>
        {condition}
        {props.showTooltip ?
          (
            <div className="cond-report-tooltip">
              <div className="close tooltip-close" role="button" tabIndex={0} onClick={props.hideTooltip} />
              <p>We see you&#39;re interested in this piece.<br />Contact one of our specialists to learn more about it.</p>
              <a className="btn report-contact-btn report-contact" href="#" onClick={props.toggleModal}>Contact Us</a>
            </div>
          ) :
          null
        }
        <p className="disclaimer"><em>Please note: Condition reports are prepared by the department as a convenience to clients and should be used as a guide only. Phillips uses due care when preparing condition reports, however, our staff are not professional restorers or conservators. Prospective purchasers are in all cases responsible for inspecting the property themselves during the pre-sale exhibition or by private viewing. Condition reports are not warranties and each lot is sold "as is" in accordance with the terms and conditions of sale, as listed in the catalogue. Should you require and further information please <a class="report-contact" onClick={props.toggleModal} href="#">contact us</a>.</em></p>
      </div>
      {contactForm}
    </div>
  );
};

ConditionReportPanel.propTypes = {
  user: PropTypes.object,
  showModal: PropTypes.bool,
  showReport: PropTypes.bool,
  toggleModal: PropTypes.func,
  toggleForm: PropTypes.func,
  condition: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

class ConditionReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: true,
      showReport: false,
      showModal: false,
      requestSucceeded: false,
      requestError: null
    };
  }

  componentDidMount() {
    getPhillipsBackboneProperty('Events')
      .then(eventEmitter => {
        this.eventEmitter = eventEmitter;
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lotNumber !== nextProps.lotNumber) {
      this.setState((state) => {
        return {
          ...state,
          showTooltip: true,
          showReport: false,
          showModal: false,
          requestSucceeded: false,
          requestError: null
        };
      });
    }
  }

  getActivityModel() {
    return {
      userId: this.props.user.id,
      email: this.props.user.email,
      activityTypeID: this.props.showConditionReport ? 1 : 2,
      saleNumber: this.props.saleNumber,
      lotNumber: this.props.lotNumber
    };
  }

  render() {
    const onSubmit = (e) => {
      e.preventDefault();
      if (this.state.requestError !== null) {
        this.setState(state => ({ ...state, requestError: null }));
      }
      const request = serialize(e.target);
      requestService.submitConditionReportRequest(request)
        .then(() => {
          this.setState(state => ({ ...state, requestSucceeded: true, showTooltip: false }));
        })
        .catch(error => this.setState(state => ({ ...state, requestError: error })));
    };
    const toggleReport = (e) => {
      e.preventDefault();
      if (this.props.showConditionReport) {
        userService.trackUserActivity(this.getActivityModel());
      }
      this.setState(state => ({ ...state, showReport: !state.showReport }));
    };
    let conditionReport = null;
    if (this.props.showConditionReport) {
      if (this.props.loggedIn) {
        const toggleModal = (e) => {
          e.preventDefault();
          this.setState(state => { return { ...state, showModal: !state.showModal }; });
        };
        conditionReport = ([
          <ConditionReportPanel
            toggleReport={toggleReport}
            toggleModal={toggleModal}
            showReport={this.state.showReport}
            showModal={this.state.showModal}
            showTooltip={this.state.showTooltip}
            requestSucceeded={this.state.requestSucceeded}
            requestError={this.state.requestError}
            onSubmit={onSubmit}
            hideTooltip={() => this.setState(state => ({ ...state, showTooltip: false }))}
            {...this.props}
          />
        ]);
      } else {
        const onSignUp = (e) => {
          e.preventDefault();
          this.eventEmitter.trigger('openRegister');
        }
        const onLogin = (e) => {
          e.preventDefault();
          this.eventEmitter.trigger('openLogin');
        }
        conditionReport = (
          <div className="login panel">
            <a href="#" className="request-button cond-signup" onClick={onSignUp} rel="nofollow">Sign up</a>
            <span>or</span>
            <a href="#" className="request-button cond-login" onClick={onLogin} rel="nofollow">Log in</a>
          </div>
        );
      }
    } else {
      conditionReport = (
        <ConditionReportRequest
          toggleReport={toggleReport}
          onSubmit={onSubmit}
          showReport={this.state.showReport}
          {...this.props}
          requestSucceeded={this.state.requestSucceeded}
          requestError={this.state.requestError}
        />
      );
    }
    return (
      <li
        className={classNames(
          'phillips-condition-report lot-page__details__list__item',
          {
            'has-report': this.props.showConditionReport,
          })}
        name={this.props.name}
      >
        <h4 className="section-header lot-page__details__list__item__header">
          Condition Report
        </h4>
        {conditionReport}
      </li>
    );
  }
}

ConditionReport.defaultProps = {
  showConditionReport: false,
  loggedIn: false,
  maker: 'No Maker',
  name: 'conditionReport',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    id: ''
  },
  condition: ''
};

ConditionReport.propTypes = {
  saleNumber: PropTypes.string.isRequired,
  lotNumber: PropTypes.string.isRequired,
  showConditionReport: PropTypes.bool,
  maker: PropTypes.string,
  name: PropTypes.string,
  loggedIn: PropTypes.bool,
  user: PropTypes.objectOf({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }),
  condition: PropTypes.string
};

export default ConditionReport;
