import React, {Component} from 'react';
import {Spinner} from 'reactstrap';
import './spinner.css';

class Spinners extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="spinner-container">
               <Spinner color= "secondary" classname= "spinner" />
            </div>
         );
    }
}
 
export default Spinners;
