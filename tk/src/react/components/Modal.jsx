import classNames from 'classnames';

const Modal = ({ children, show }) => (
  <div className={classNames({
    'modal-container' : true,
    'show': show
  })}
  >
    <div className="modal-overlay" />
    <div className="container">
      {children}
    </div>
  </div>
);

export default Modal;