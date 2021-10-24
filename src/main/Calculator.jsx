import React, { Component } from "react";
import ReactDOM from 'react-dom';

import "./Calculator.css";
import Button from "../Components/Button";
import Display from "../Components/Display";

const initialState = {
    operationValue: "",
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

class Calculator extends Component {

    state = { ...initialState };

    constructor(props) {
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.delDigit = this.delDigit.bind(this);
        this.pressKey = this.pressKey.bind(this);
    }

    componentDidMount() {
      ReactDOM.findDOMNode(this.refs.divCalculator).focus();
    }

    clearMemory() {
        this.setState({ ...initialState });
    }
    
    setOperation(operation) {
        const currentOp = this.state.operation;
        const equals = operation === "=";
        const values = [ ...this.state.values ];

        if ( this.state.current === 0 ) {
            if ( (isNaN(values[0])) || (values[0] === 0) ) {
                return;
            }
            const percentage = operation === "%";
            if ( percentage ) {
                this.clearMemory();
            } else {
                if ( (currentOp === "=") && (!equals) ) { 
                    const operationValue = values[0] + " " + operation + " ";
                    this.setState({
                        operationValue, 
                        current: 1, 
                        operation, 
                        clearDisplay: true, 
                    });
                } else {
                    this.setState({
                        operation,
                        current: 1,
                        clearDisplay: true
                    });
                    
                    if ( this.state.operationValue.substring(this.state.operationValue.length - 2).trim() !== operation ) {
                        const operationValue = this.state.operationValue + " " + operation + " ";
                        this.setState({operationValue});
                    }
                }                
            }
        } else {
            const division = currentOp === "/";            
            if ( (equals) && (division) && (values[1] === 0) ) {
                const operationValue = "Division by 0";
                this.setState({operationValue});
                return;
            }

            let nCalcValue = 0;

            if ( (currentOp !== "%") && (operation === "%") ) {
                const percentValue = (values[1] * values[0]) / 100;
                nCalcValue = this.calcOperation(values[0], percentValue, currentOp);
            } else {
                nCalcValue = this.calcOperation(values[0], values[1], currentOp);
            }
            values[0] = nCalcValue;
            values[1] = 0;

            if ( this.state.operationValue.substring(this.state.operationValue.length - 2).trim() !== operation ) {
                const operationValue = this.state.operationValue + " " + operation + " ";
                this.setState({operationValue});
            }
            
            this.setState({
                displayValue: values[0], 
                current: (equals ? 0 : 1),
                operation: operation,
                clearDisplay: !equals,
                values
            });
        }
    }

    calcOperation(n1, n2, currentOp) {
        try {
            return eval(`${n1} ${currentOp} ${n2}`);
        } catch(e) {
            return n1;
        }
    }
    
    addDigit(n) {
        if ( (n === ".") && (this.state.displayValue.includes(".")) ) {
            return;
        }

        const clearDisplay = this.state.displayValue === "0" || this.state.displayValue === "Division by 0" || this.state.clearDisplay;
        const currentValue = (clearDisplay ? "" : this.state.displayValue);
        const displayValue = currentValue + n;
        const operationValue = this.state.operationValue + n;
        
        this.setState({
            displayValue, 
            clearDisplay: false,
            operationValue
        });

        if ( n !== "." ) {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [ ...this.state.values ];
            values[i] = newValue;
            this.setState({ values });
        }
    }

    delDigit() {
        const currentValue = (this.state.clearDisplay ? "" : this.state.displayValue);
        const displayValue = (currentValue.length === 1 || this.state.clearDisplay ? "0" : currentValue.substring(0, currentValue.length - 1));
        
        const lastChar = this.state.operationValue.substring(this.state.operationValue.length - 1).trim();
        const isNumber = !isNaN(lastChar) && !isNaN(parseFloat(lastChar));
        const operationValue = (isNumber ? this.state.operationValue.substring(0, this.state.operationValue.length - 1) : this.state.operationValue);
        
        const i = this.state.current;
        const newValue = parseFloat(displayValue);
        const values = [ ...this.state.values ];
        values[i] = newValue;
        
        this.setState({displayValue, operationValue, values});
    }

    pressKey(key) {
        const keyPressed = key.key;
        const isNumber = !isNaN(keyPressed) && !isNaN(parseFloat(keyPressed));

        if ( (isNumber) || (keyPressed === ".") ){
            this.addDigit((keyPressed === "." ? keyPressed : parseInt(keyPressed)));
        } else {
            switch (keyPressed) {
                case "Backspace":
                    this.delDigit();
                    break;
                case "/":
                    this.setOperation(keyPressed);
                    break;
                case "*":
                    this.setOperation(keyPressed);
                    break;
                case "+":
                    this.setOperation(keyPressed);
                    break;
                case "-":
                    this.setOperation(keyPressed);
                    break;
                case "%":
                    this.setOperation(keyPressed);
                    break;
                case "=":
                    this.setOperation(keyPressed);
                    break;
                case "Enter":
                    this.setOperation("=");
                    break;
                case "Escape":
                    this.clearMemory();
                    break;
                default:
                    break;
            }
        }  
    }

    render () {
        return (
            <div className="calculator" onKeyDown={this.pressKey} tabIndex="0" ref="divCalculator">
                <Display opValue={this.state.operationValue} value={this.state.displayValue} />
                <Button label="%" operation click={this.setOperation}/>
                <Button label="AC" operation click={this.clearMemory}/>
                <Button label="<-" operation click={this.delDigit}/>
                <Button label="/" operation click={this.setOperation}/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" operation click={this.setOperation}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" operation click={this.setOperation}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" operation click={this.setOperation}/>
                <Button label="0" double click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" equal click={this.setOperation}/>
            </div>  
        );
    }
}

export default Calculator;