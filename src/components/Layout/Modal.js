import React from 'react';

const Modal = (props) => {
    return (
        <div
            id="shareModal"
            className="modal"
            style={{ display: props.showModal ? 'block' : 'none' }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <span
                        className="close"
                        onClick={() => props.setShowModal(false)}
                    >
                        &times;
                    </span>
                    <h5>{props.title}</h5>
                </div>
                <div
                    className={`modal-body ${
                        props.additionalClasses ? props.additionalClasses : ''
                    }`}
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
