import React,{useState} from 'react';
import {Modal, ModalBody, } from 'reactstrap';
import registerBg from '../../assets/new_register_bg.svg';

const UIModal = ({children,modal,title,className,hideModal}) => {


    const [showModal, setModal] = useState(modal);

    const toggleModal= ()=>{
        hideModal();
        toggle();
    };

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Modal centered={true} isOpen={showModal} toggle={toggleModal} className={className}>
            
                <ModalBody>
                <div className= "modal-background" toggle={toggleModal}>
                    <img  src={registerBg} className= "bg-modal-img" alt="register-bg"/>
                </div>
               
                    {children}
                </ModalBody>
            </Modal>
        </div>
    );
}
export default UIModal;