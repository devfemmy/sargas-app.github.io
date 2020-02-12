import React, { useState } from 'react';
import { Collapse} from 'reactstrap';
import './collapse.css';

const CollapseUi = (props) => {
    const plus = 'More';
    const minus = 'Less'
    const [collapse, setCollapse] = useState(false);
    const [status, setStatus] = useState(plus);
    const onEntered = () => setStatus(minus);
    const onExited = () => setStatus(plus);
  
    const toggle = () => setCollapse(!collapse);
    return ( 
            <div className= "collapsable-div">
            <div>{props.name}</div>
              
                <Collapse
                    isOpen={collapse}
                    onEntered={onEntered}
                    onExited={onExited}
                >
                <div>

                {props.children}
                
                </div>
                </Collapse>
                <h5 style={{fontWeight: 'bolder', textAlign: 'right'}} className= "" onClick={toggle} >{status}</h5>
        </div>
   
     );
}

export default CollapseUi;