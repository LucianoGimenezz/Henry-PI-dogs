import { createContext, useState } from "react";


const ModalContext = createContext()

const ModalProvider = (props) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <ModalContext.Provider value={{
            openModal,
            setOpenModal
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }