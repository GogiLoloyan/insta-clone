import { createContext, useState } from 'react';

const ModalContext = createContext(null);

export const ModalContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const closeModal = () => {
        setIsOpen(false)
        setContent(null)
    }

    const openModal = ({ content }) => {
        setIsOpen(true)
        setContent(content)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                content,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext }