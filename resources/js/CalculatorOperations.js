define(["dojo/_base/declare"], function (declare) {

	"use strict";

	var maxLenght = 20;

	return declare(null, {

		constructor: function (newValue) {
			this.setValue(newValue);
		},

		setValue: function (newValue) {
			this.text = newValue;
		},

		getValue: function () {
			return this.text;
		},

		textLengthMeetsOrExceedsMaxSupportedLength: function () {
			return this.text.length >= maxLenght;
		},

		appendDecimalPoint: function () {
			if (this.textLengthMeetsOrExceedsMaxSupportedLength()) {
				alert("Max Numbers allowed are of length 20.");
				return;
			}

			if (this.operandWithoutDecimalPoint()) {
				this.text += ".";
			}
		},

		operandWithoutDecimalPoint: function () {
			return this.text.indexOf(".") === -1;
		},

		operandEndingWithDecimalPoint: function () {
			return (this.text.indexOf(".") === this.text.length - 1);
		},

		appendDigit: function (digit) {
			if (this.textLengthMeetsOrExceedsMaxSupportedLength()) {
				alert("Max Numbers allowed are of length 20.");
				return;
			}

			if (this.text === "0") {
				if (digit !== "0") {
					this.text = digit;
				}
			} else {
				this.text += digit;
			}
		},

		toggleSign: function () {
			if (this.getNumeric() !== 0) {
				this.text = "-" + this.text;
				if (this.text.substring(0, 2) === "--") {
					this.text = this.text.substring(2);
				}
			}
		},

		getDecimalPosition: function () {
			var decimalPosition,
			indexOfDecimalPoint;
			if (this.operandWithoutDecimalPoint() || this.operandEndingWithDecimalPoint()) {
				decimalPosition = 0;
			} else {
				indexOfDecimalPoint = this.text.indexOf(".");
				decimalPosition = (this.text.length - 1) - indexOfDecimalPoint;
			}
			return decimalPosition;
		},

		getNumeric: function () {
			return parseFloat(this.text);
		},

		addTo: function (operand2) {
			var result = this.getNumeric() + operand2.getNumeric(),
			decimalPositionOfOperand1 = this.getDecimalPosition(),
			decimalPositionOfOperand2 = operand2.getDecimalPosition(),
			decimalPositionOfResult = Math.max(decimalPositionOfOperand1, decimalPositionOfOperand2);
			return new this.constructor(result.toFixed(decimalPositionOfResult).toString());
		},

		substractFrom: function (operand2) {
			var result = this.getNumeric() - operand2.getNumeric(),
			decimalPositionOfOperand1 = this.getDecimalPosition(),
			decimalPositionOfOperand2 = operand2.getDecimalPosition(),
			decimalPositionOfResult = Math.max(decimalPositionOfOperand1, decimalPositionOfOperand2);
			return new this.constructor(result.toFixed(decimalPositionOfResult).toString());
		},

		multiplyBy: function (operand2) {
			var result = this.getNumeric() * operand2.getNumeric(),
			decimalPositionOfOperand1 = this.getDecimalPosition(),
			decimalPositionOfOperand2 = operand2.getDecimalPosition(),
			decimalPositionOfResult = decimalPositionOfOperand1 + decimalPositionOfOperand2;
			return new this.constructor(result.toFixed(decimalPositionOfResult).toString());

		},

		divideBy: function (operand2) {
			var result = this.getNumeric() / operand2.getNumeric();
			if(result!="Infinity"){
				result = +(Math.round(result + "e+2")  + "e-2");
			}
			return new this.constructor(result.toString());
		},

		percentile: function(operand2){
			var result = this.getNumeric() % operand2.getNumeric();
			return new this.constructor(result.toString());
		}

	});

});