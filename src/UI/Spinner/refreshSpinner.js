import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import './spinner.css';

class RefreshSpinner extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="spinner-container2">
                <Spinner color= "secondary"  />
            </div>
         );
    }
}
 
export default RefreshSpinner;