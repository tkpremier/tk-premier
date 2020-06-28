import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import ResponseBox from '../../components/responsebox';
import EditorFormHooks from './EditorForm';

const EditorModal = ({
  elementType, visible, type, response, isRequestPending, onHide
}) => {
  const dialogClass = isRequestPending ? 'pending-request' : '';
  return (
    <Modal dialogClassName={dialogClass} show={visible} backdrop="static" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditorFormHooks formType={type} elementType={elementType} />
      </Modal.Body>
      <Modal.Footer>
        {response && response.message
          ? (
            <ResponseBox
              action={type}
              onHide={onHide}
              {...response}
            />
          )
          : null
        }
      </Modal.Footer>
    </Modal>
  );
};

EditorModal.propTypes = {
  elementType: PropTypes.string,
  type: PropTypes.string,
  visible: PropTypes.bool,
  isRequestPending: PropTypes.bool,
  response: PropTypes.object,
  onHide: PropTypes.func
};

export default EditorModal;
