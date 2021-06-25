/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"gruppo3/gruppo3/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});