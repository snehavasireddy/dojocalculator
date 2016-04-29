define(["dojo/dom", "dojo/_base/declare"], function (dom, declare) {

	"use strict";

	return declare(null, {
		display: dom.byId("display"),
		constructor: function (value) {
			this.setValue(value);
		},
		setValue: function (value) {
			this.display.value = value;
		},
		getValue: function () {
			return this.display.value;
		}
	});
});