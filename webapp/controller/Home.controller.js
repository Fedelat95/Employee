sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("gruppo3.gruppo3.controller.Home", {
        navGo:function() {
          this.getRouter().navTo('worklist');
        },
         navGo1:function() {
          this.getRouter().navTo('EmployeesCheck');
        },

  navGo2:function() {
          this.getRouter().navTo('WarnEmployee');
        },
         navGo3:function() {
          this.getRouter().navTo('esterni');
        }


    
  });

})