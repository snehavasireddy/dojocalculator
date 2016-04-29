require([
         "dojo/dom",
         "dojo/on",
         "resources/js/CalculatorUtil.js",
         "dojo/domReady!"],

         function (dom,
        		 on,
        		 CalculatorUtil) {

	"use strict";

	var calculator = new CalculatorUtil(),

	numberButtonEventHandler = function (number) {
		on(dom.byId("numberKey" + number), "click", function () {
			$('#display').css( "color", "" );
			$('#display').css( "font-size", "50px" );
			$('.form-group').removeClass('has-error');
			calculator.addDigit(number);
		});
	},

	loadNumberForNumberButtonsEvent = function(){
		for (var i = 0; i < 10; i++) {
			numberButtonEventHandler(i.toString());
		}
	}

	//Clear Button Event
	$(function () {
		on(dom.byId("clearButton"), "click", function () {
			$('#display').css( "color", "" );
			$('#display').css( "font-size", "50px" );
			$('.form-group').removeClass('has-error');
			calculator.clear();
		});
	});

	//Delete Button Event
	$(function() {
		on(dom.byId("deleteButton"), "click", function (){
			var displayValue = dom.byId("display").value;
			if(displayValue === "Cannot divide by zero" || displayValue === "NaN"){
				calculator.clear();
				$('#display').css( "color", "" );
				$('#display').css( "font-size", "50px" );
				$('.form-group').removeClass('has-error');
			}else{
				calculator.singleDelete();
			}
		});
	});

	//Equals Button Event
	$(function () {
		on(dom.byId("equalsButton"), "click", function () {
			calculator.equals();
			var displayValue = dom.byId("display").value;
			if(displayValue === "Infinity"){
				$('#display').val( "Cannot divide by zero");
				$('#display').css( "color", "#da4453" );
				$('#display').css( "font-size", "30px" );
				$('.form-group').addClass('has-error');
			}else if(displayValue === "NaN"){
				$('#display').css( "color", "#da4453" );
				$('#display').css( "font-size", "30px" );
				$('.form-group').addClass('has-error');
			}
		});
	});

	//Toggle Sign Button Event
	$(function () {
		on(dom.byId("toggleButton"), "click", function () {
			calculator.toggleSign();
		});
	});

	//Decimal Point Button Event
	$(function () {
		on(dom.byId("decimalPoint"), "click", function () {
			$('#display').css( "color", "" );
			$('#display').css( "font-size", "50px" );
			$('.form-group').removeClass('has-error');
			calculator.addDecimalPoint();
		});
	});

	//Operator Buttons Events
	$(function () {
		on(dom.byId("addOperator"), "click", function () {
			calculator.add();
		});
		on(dom.byId("minusOperator"), "click", function () {
			calculator.substract();
		});
		on(dom.byId("multiplyOperator"), "click", function () {
			calculator.multiply();
		});
		on(dom.byId("divideOperator"), "click", function () {
			calculator.divide();
		});
		on(dom.byId("percentileOperator"), "click", function () {
			calculator.percentile();
		});
	});


	loadNumberForNumberButtonsEvent();
	calculator.clear();
});