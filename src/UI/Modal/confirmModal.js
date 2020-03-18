import React, { useState } from 'react';
import { Button, Modal,  ModalBody, ModalFooter,} from 'reactstrap';

const ConfirmModal = (props) => {
  const {
    className
  } = props;
  const [modal, setModal] = useState(true);
//   const [ ] = useState(true);
  const [keyboard] = useState(true);

  const toggle = () => {
    localStorage.setItem('delivery_status', 2);
      setModal(!modal)
    };

//   const changeBackdrop = e => {
//     let value = e.target.value;
//     if (value !== 'static') {
//       value = JSON.parse(value);
//     }
//     setBackdrop(value);
//   }

//   const changeKeyboard = e => {
//     setKeyboard(e.currentTarget.checked);
//   }

  return (
    <div>
      <Modal centered= {true} isOpen={modal} toggle={toggle} className={className} backdrop={"static"} keyboard={keyboard}>
        <ModalBody>
           <p>Thank you for using our service.</p> 
           <p> Please click CONFIRM DELIVERY to confirm delivery.</p>
        </ModalBody>
        <ModalFooter>
          <Button style= {{background: '#009245', border: 'none'}} color="primary" onClick={toggle}>CONFIRM DELIVERY</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModal;