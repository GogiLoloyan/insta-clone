import React, { useContext, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/modal';

import './index.css';

const Modal = () => {
    const { isOpen, content, closeModal } = useContext(ModalContext)

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.documentElement.style.overflow = ''
        }
    }, [isOpen]);
    
    if (!isOpen) {
        return null
    }

    return (
        createPortal(
            <>
                <div className="modal-mask" onClick={closeModal} />
                <div className='modal' >{content}</div>
            </>,
            document.getElementById('modal-portal'),
        )
    )
}

export default Modal;