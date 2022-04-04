import React from 'react';
import PropTypes from 'prop-types';

function ModalController(props) {
  const { modalReducer } = props;
  const { open, dialogProps, dialogType } = modalReducer;

  if (!modalReducer) {
    return <div />;
  }

  const modalOutput = [];
  if (open) {
    const modalComponent = React.createElement(
      dialogType,
      Object.assign({}, dialogProps),
    );
    modalOutput.push(modalComponent);
  }
  return <div className="modal">{modalOutput?.[0]}</div>;
}

ModalController.propTypes = {
  modalReducer: PropTypes.object,
};

export default ModalController;
