import React, { useState } from 'react';
import { Collapse, Row, Col} from 'reactstrap';
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
                <div>
                    <Row>
                        <Col>
                        <p style={{color: 'black', opacity: '0.6'}}>
                        {props.date}
                        </p>
                           
                        </Col>
                        <Col>
                        <p style={{color: 'black', opacity: '0.6', textAlign: 'right'}} className= "" onClick={toggle} >{status}</p>
                        </Col>
                    </Row>
                </div>
              
        </div>
   
     );
}

export default CollapseUi;