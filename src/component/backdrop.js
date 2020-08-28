import React from 'react';
import  '../Style/backdrop.css';

const backdrop = props => {
    
    return (
      <div className="backdrop">
          {props.children}          
      </div>
    );
}
export default backdrop;