/**
 * QUnit Test for Simple Calculator Application
 */
require(["dojo/dom", "dojo/_base/window", "dojo/domReady!"],

		function (dom, window) {

	"use strict";

	var display,
	initializationFlag = false,
	getDojoContextToApplication = function () {
		var applicationToTest = dom.byId("applicationToTest").contentWindow;
		window.setContext(applicationToTest.window,applicationToTest.window.document);
	};

	module("Calculator", {
		setup: function () {
			if (!initializationFlag) {
				getDojoContextToApplication();
				display = dom.byId("display");
				initializationFlag = true;
			}
		},
		teardown: function () {
			dom.byId("clearButton").click();
			strictEqual(display.value, "0");
		}
	});

	test("1 + 4 = 5", function () {
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("addOperator").click();
		strictEqual(display.value, "1");
		dom.byId("numberKey4").click();
		strictEqual(display.value, "4");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "5");
	});

	test("6 - 12 = -6", function () {
		dom.byId("numberKey6").click();
		strictEqual(display.value, "6");
		dom.byId("minusOperator").click();
		strictEqual(display.value, "6");
		dom.byId("numberKey1").click();
		dom.byId("numberKey2").click();
		strictEqual(display.value, "12");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "-6");
	});

	test("4 * 5 = 20", function () {
		dom.byId("numberKey4").click();
		strictEqual(display.value, "4");
		dom.byId("multiplyOperator").click();
		strictEqual(display.value, "4");
		dom.byId("numberKey5").click();
		strictEqual(display.value, "5");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "20");
	});

	test("6 / 3 = 2", function () {
		dom.byId("numberKey6").click();
		strictEqual(display.value, "6");
		dom.byId("divideOperator").click();
		strictEqual(display.value, "6");
		dom.byId("numberKey3").click();
		strictEqual(display.value, "3");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "2");
	});

	test("Decimal Point", function () {
		dom.byId("numberKey4").click();
		strictEqual(display.value, "4");

		dom.byId("decimalPoint").click();
		strictEqual(display.value, "4.");

		dom.byId("numberKey3").click();
		strictEqual(display.value, "4.3");

		dom.byId("numberKey5").click();
		strictEqual(display.value, "4.35");
	});

	test("Toggle Sign", function () {
		dom.byId("numberKey5").click();
		strictEqual(display.value, "5");
		dom.byId("numberKey5").click();
		strictEqual(display.value, "55");

		dom.byId("toggleButton").click();
		strictEqual(display.value, "-55");

		dom.byId("toggleButton").click();
		strictEqual(display.value, "55");
	});

	test("Division by zero", function () {
		dom.byId("numberKey9").click();
		strictEqual(display.value, "9");
		dom.byId("divideOperator").click();
		strictEqual(display.value, "9");
		dom.byId("numberKey0").click();
		strictEqual(display.value, "0");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "Cannot divide by zero");
	});

	test("NaN Situation", function () {
		dom.byId("numberKey8").click();
		strictEqual(display.value, "8");
		dom.byId("multiplyOperator").click();
		strictEqual(display.value, "8");
		dom.byId("decimalPoint").click();
		strictEqual(display.value, ".");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "NaN");
	});

	test("Round-off on Decimal Division", function () {
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("decimalPoint").click();
		strictEqual(display.value, "1.");
		dom.byId("numberKey0").click();
		strictEqual(display.value, "1.0");
		dom.byId("numberKey0").click();
		strictEqual(display.value, "1.00");
		dom.byId("numberKey5").click();
		strictEqual(display.value, "1.005");
		dom.byId("divideOperator").click();
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "1.01");
	});

	test("Backspace on Operands", function () {
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("decimalPoint").click();
		strictEqual(display.value, "1.");
		dom.byId("numberKey0").click();
		strictEqual(display.value, "1.0");
		dom.byId("numberKey0").click();
		strictEqual(display.value, "1.00");
		dom.byId("numberKey5").click();
		strictEqual(display.value, "1.005");
		dom.byId("deleteButton").click();
		strictEqual(display.value, "1.00");
	});

	test("Backspace on results", function () {
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("decimalPoint").click();
		strictEqual(display.value, "1.");
		dom.byId("numberKey6").click();
		strictEqual(display.value, "1.6");
		dom.byId("numberKey5").click();
		strictEqual(display.value, "1.65");
		dom.byId("numberKey7").click();
		strictEqual(display.value, "1.657");
		dom.byId("divideOperator").click();
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "1.66");
		dom.byId("deleteButton").click();
		strictEqual(display.value, "1.6");
	});

	test("Backspace on Special Conditions", function () {
		dom.byId("numberKey1").click();
		strictEqual(display.value, "1");
		dom.byId("divideOperator").click();
		dom.byId("numberKey0").click();
		strictEqual(display.value, "0");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "Cannot divide by zero");
		dom.byId("deleteButton").click();
		strictEqual(display.value, "0");
	});

	test("Chained Calculations", function () {
		dom.byId("numberKey4").click();
		strictEqual(display.value, "4");
		dom.byId("divideOperator").click();
		strictEqual(display.value, "4");
		dom.byId("numberKey2").click();
		strictEqual(display.value, "2");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "2");
		dom.byId("multiplyOperator").click();
		strictEqual(display.value, "2");
		dom.byId("numberKey5").click();
		strictEqual(display.value, "5");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "10");
	});

	test("Toggle Sign and then append digit", function () {
		dom.byId("numberKey9").click();
		strictEqual(display.value, "9");
		dom.byId("toggleButton").click();
		strictEqual(display.value, "-9");
		dom.byId("numberKey6").click();
		strictEqual(display.value, "-96");
	});

	test("Consequtive operators without operand cancels first Operator", function () {
		dom.byId("numberKey7").click();
		strictEqual(display.value, "7");
		dom.byId("addOperator").click();
		strictEqual(display.value, "7");
		dom.byId("multiplyOperator").click();
		strictEqual(display.value, "7");
		dom.byId("numberKey2").click();
		strictEqual(display.value, "2");
		dom.byId("equalsButton").click();
		strictEqual(display.value, "14");
	});


});