sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/library"
], function (Controller, History, mobileLibrary) {
	"use strict";
var URLHelper = mobileLibrary.URLHelper;
        var List = Controller.extend("gruppo3.gruppo3.controller.esterni", {

		onInit : function () {
		
        },
        
onIndietro1: function () {
            var oBack = History.getInstance();
            var sPreviousHash = oBack.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRou = sap.ui.core.UIComponent.getRouterFor(this);
                oRou.navTo("Home", true);
            }
        },  
        _getVal: function(evt) {
			return evt.getSource().getValue();
		},
            EmailPress: function (evt) {
			URLHelper.triggerEmail(this._getVal(evt), "Info Request", false, false, false, true);
		},
		    webPress: function (evt) {
			URLHelper.redirect(this._getVal(evt), true);
		}      
	});
return List;
});