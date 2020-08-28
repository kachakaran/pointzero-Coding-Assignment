import React from 'react';
import  '../Style/model.css';

const model = (props) => {
    return (
        <div className="model">
             {props.children}
        </div>
    );
};

export default model;