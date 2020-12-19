import React from 'react';

const ShareModal = ({ msg, link, showModal, setShowModal }) => {
    const copyToClipboard = () => {
        const copyText = document.getElementById('link');

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand('copy');
    };
    return (
        <div
            id="shareModal"
            className="modal"
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => setShowModal(false)}>
                        &times;
                    </span>
                    <h5>Share this post!</h5>
                </div>
                <div className="modal-body modal-body-share">
                    <input
                        onClick={() => copyToClipboard()}
                        id="link"
                        type="text"
                        value={link}
                        readOnly
                    />

                    <i
                        className="far fa-clipboard"
                        onClick={() => copyToClipboard()}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
