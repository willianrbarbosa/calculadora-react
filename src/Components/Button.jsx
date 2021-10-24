import React from "react";
import "./Button.css";

const button = (props) => {
    return (
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={`
            btn-calc
                ${props.operation ? 'btn-calc-operation' : ''}
                ${props.equal ? 'btn-calc-equal' : ''}   
                ${props.double ? 'btn-calc-double' : ''}    
                ${props.triple ? 'btn-calc-triple' : ''}     
            `}>
            {props.label}
        </button>
    );
}

export default button;