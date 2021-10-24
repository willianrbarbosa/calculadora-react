import React from "react";
import "./Display.css";

const display = (props) => {
    return (
        <div className="display-calc">
            <div className="op-value">{props.opValue}</div>
            <div className="value">{props.value}</div>
        </div>
    );
}

export default display;