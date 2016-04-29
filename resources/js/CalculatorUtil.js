define(["dojo/dom", "dojo/_base/declare", "resources/js/CalculatorOperations.js", "resources/js/Operator.js", "resources/js/Display.js"],

		function (dom, declare, CalculatorOperations, Operator, Display) {

	"use strict";

	return declare(null, {

		//Clear function that gets invoked when Clear Button is clicked.
		clear: function () {
			this.operand1 = new CalculatorOperations("0");
			this.operand2 = new CalculatorOperations("");
			this.operator = null;
			this.activeOperand = this.operand1;
			this.display = new Display(this.activeOperand.getValue());
			this.result = new CalculatorOperations("");
			this.lastButtonPressedWasEquals = false;
		},

		//Function that gets invoked when backspace is click.
		singleDelete: function () {

			if((this.result.getValue()!=="") && (this.operand2.getValue()!=="") && (this.operand1.getValue()!=="")){
				var operandValue = this.result.getValue();
				operandValue= operandValue.substring(0, operandValue.length - 1);

				if(operandValue.length>0){
					this.operand1=new CalculatorOperations(operandValue);
				}
				else
				{
					this.operand1=new CalculatorOperations("0");
				}
				this.activeOperand =  this.operand1;
				this.updateDisplayWithActiveOperand();
				this.operand2.setValue("");
			}

			else if((this.result.getValue()!=="") && (this.operand2.getValue()=="") && (this.operand1.getValue()!=="")){
				var operandValue = this.operand1.getValue();
				operandValue= operandValue.substring(0, operandValue.length - 1);

				if(operandValue.length>0){
					this.operand1=new CalculatorOperations(operandValue);
				}
				else
				{
					this.operand1=new CalculatorOperations("0");
				}
				this.activeOperand =  this.operand1;
				this.updateDisplayWithActiveOperand();
				this.operand2.setValue("");
			}

			else if(this.operand2.getValue()=="" && this.result.getValue()==""){
				var operandValue = this.operand1.getValue();
				operandValue= operandValue.substring(0, operandValue.length - 1);	

				if(operandValue.length>0){
					this.operand1=new CalculatorOperations(operandValue);
				}
				else
				{
					this.operand1=new CalculatorOperations("0");
				}
				this.activeOperand =  this.operand1;
				this.updateDisplayWithActiveOperand();
			}

			else if(this.operand1.getValue()!=="" && this.result.getValue()==""){
				var operandValue = this.operand2.getValue();
				operandValue= operandValue.substring(0, operandValue.length - 1);
				if(operandValue.length>0){
					this.operand2=new CalculatorOperations(operandValue);
				}
				else{
					this.operand2=new CalculatorOperations("0");
				}
				this.activeOperand =  this.operand2;
				this.updateDisplayWithActiveOperand();

			}

			else {
				this.clear();
			}
		},

		updateDisplayWithActiveOperand: function () {
			this.display.setValue(this.activeOperand.getValue());
		},

		//Function to add Operands on to the TextBox
		addDigit: function (digit) {
			if (this.lastButtonPressedWasEquals) {
				this.clear();
			}
			this.activeOperand.appendDigit(digit);
			this.updateDisplayWithActiveOperand();
		},

		//Function called when the ToggleSign Button is clicked
		toggleSign: function () {
			if (!this.lastButtonPressedWasEquals) {
				this.activeOperand.toggleSign();
				this.updateDisplayWithActiveOperand();
			}
		},

		addDecimalPoint: function () {
			if (this.lastButtonPressedWasEquals) {
				this.clear();
			}
			this.activeOperand.appendDecimalPoint();
			this.updateDisplayWithActiveOperand();
		},

		copyResultIntoOperand1: function () {
			this.operand1.setValue(this.result.getValue());
		},

		clearOperand2: function () {
			this.operand2.setValue("");
		},

		//Function that check for completeness of Expressing and then call final Calculation function
		ifExpressionIsCompleteCalculateResult: function () {
			if (this.expressionIsComplete()) {
				this.calculateAndDisplayResult();
				this.copyResultIntoOperand1();
				this.clearOperand2();
			}
		},

		//Function called when the AddTo Button is clicked.
		add: function () {
			this.ifExpressionIsCompleteCalculateResult();
			this.operator = Operator.PLUS;
			this.activeOperand = this.operand2;
			this.lastButtonPressedWasEquals = false;
		},

		//Function called when the SubstractFrom Button is clicked.
		substract: function () {
			this.ifExpressionIsCompleteCalculateResult();
			this.operator = Operator.MINUS;
			this.activeOperand = this.operand2;
			this.lastButtonPressedWasEquals = false;
		},

		//Function called when the MultiplyBy Button is clicked.
		multiply: function () {
			this.ifExpressionIsCompleteCalculateResult();
			this.operator = Operator.MULTIPLY_BY;
			this.activeOperand = this.operand2;
			this.lastButtonPressedWasEquals = false;
		},

		//Function called when the DivideBy Button is clicked.
		divide: function () {
			this.ifExpressionIsCompleteCalculateResult();
			this.operator = Operator.DIVIDE_BY;
			this.activeOperand = this.operand2;
			this.lastButtonPressedWasEquals = false;
		},

		//Function called when the Percentile Button is clicked.
		percentile: function () {
			this.ifExpressionIsCompleteCalculateResult();
			this.operator = Operator.PERCENTILE;
			this.activeOperand = this.operand2;
			this.lastButtonPressedWasEquals = false;
		},

		//Function called when the result is requested by clicking Equals Button 
		equals: function () {
			if (this.expressionIsComplete()) {
				this.calculateAndDisplayResult();
			}
			this.lastButtonPressedWasEquals = true;
		},

		//Function to check if the Operator is present or not
		expressionHasOperator: function () {
			return this.operator !== null;
		},

		//Function to check if the Operand 1 is present or not
		expressionHasOperand1: function () {
			return this.operand1.getValue() !== "";
		},

		//Function to check if the Operand 2 is present or not
		expressionHasOperand2: function () {
			return this.operand2.getValue() !== "";
		},

		//Check whether the entered express is Valid 
		expressionIsComplete: function () {
			return this.expressionHasOperand1() && this.expressionHasOperator() && this.expressionHasOperand2();
		},

		//The Calculation is made based on the operator and the the result is updated on to the TextBox
		calculateAndDisplayResult: function () {
			if (this.operator === Operator.PLUS) {
				this.result = this.operand1.addTo(this.operand2);
			} else if (this.operator === Operator.MINUS) {
				this.result = this.operand1.substractFrom(this.operand2);
			} else if (this.operator === Operator.MULTIPLY_BY) {
				this.result = this.operand1.multiplyBy(this.operand2);
			} else if (this.operator === Operator.DIVIDE_BY) {
				this.result = this.operand1.divideBy(this.operand2);
			} else if (this.operator === Operator.PERCENTILE) {
				this.result = this.operand1.percentile(this.operand2);
			}else {
				throw new Error("Unexpected operator.");
			}
			this.updateDisplayWithResult();
		},

		//Function that updates the value in the TextBox
		updateDisplayWithResult: function () {
			this.display.setValue(this.result.getValue());
		}

	});

});