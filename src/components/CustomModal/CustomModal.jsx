import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Modal from 'react-responsive-modal';

import './CustomModal.css';

class CustomModal extends Component {

  render() {
    const { title, children, open, onClose, blocking } = this.props;
    const path = <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" stroke="white" fill="white" />;
    let classes = {
      overlay: 'modalOverlay',
      closeButton: 'modalCloseButton',
    };

    let element = <Modal open={open} onClose={onClose} classNames={classes} center>
      <div className='customModalContent'>
        {children}
      </div>
    </Modal>;

    if (title !== undefined) {
      classes.modal = 'modalBox';
      element = <Modal open={open} onClose={onClose} classNames={classes} center closeIconSvgPath={path}>
          <div className='customModalTitle'>
            <span>{title}</span>
          </div>
          <div className='customModalContent'>
            {children}
          </div>
        </Modal>;
    } else {
      if (blocking === true) {
        element = <Modal open={open} onClose={onClose} classNames={classes} center blockScroll={true}
          closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} focusTrapped={false}>
            <div className='customModalContent'>
              {children}
            </div>
          </Modal>;
      } else {
        element = <Modal open={open} onClose={onClose} classNames={classes} center>
            <div className='customModalContent'>
              {children}
            </div>
          </Modal>;
      }
    }

    return element;
  }
}

export default translate()(CustomModal);
