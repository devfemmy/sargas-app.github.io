import React, {Component} from 'react';

import './spinner.css';

class Spinner extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="loader-container">
                <div className = "loader">Loading...</div> 
            </div>
         );
    }
}
 
export default Spinner;
