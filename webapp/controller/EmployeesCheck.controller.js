sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/routing/History"
], function (BaseController, JSONModel, History) {
	"use strict";

	return BaseController.extend("gruppo3.gruppo3.controller.EmployeesCheck", {
    onInit: function(){
       let data = {
        EmployeeID: "",
        LastName: "",
        FirstName: "",
        Title: "",
        
        Address: "",
        City: "",
        Region: "",
        PostalCode: "",
        Country: ""
      };

      let dataModel = new JSONModel(data);
      this.setModel(dataModel, "formData");
    },
    clearForm: function() {
      let form = this.byId("userData");
      let formElements = form.getAggregation("formContainers")[0].getAggregation("formElements");
      formElements.forEach( obj => {
        obj.getAggregation("fields")[0].setValue("")
      })
    },
    formatCustomerID: function( oControlEvent ){
     let input = parseInt(oControlEvent.getParameter("value"));
      if( this.id( input ) ){
          } else {
          sap.m.MessageToast.show("L'ID Employee può contenere solo numeri interi")
      }

    },
    formatName: function( oControlEvent ) {
      let string = oControlEvent.getParameter("value");
      let sourceName = oControlEvent.getSource().getParent().getAggregation("label").replace(/\s/g, "");
      let inputID = sourceName.charAt(0).toLowerCase()+ sourceName.slice(1);
      const toUppercase = string => string.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
      if( string != "" ){
        this.byId(inputID).setValue(toUppercase(string));
      }

    },
       format: function( oControlEvent ){
      let currentValue = oControlEvent.getParameter("value");
      let regex = "^[a-zA-Z]+$";
      if( currentValue.match(regex) ){
        } else {
        
        sap.m.MessageToast.show("Può contenere solo lettere");
      }
    },

    cityCompiler: function( oControlEvent ) {
      let aFormData = this.getView().getModel("formData").getData();
      let selectedKey = oControlEvent.getParameter("selectedItem").getProperty("key");
      if( selectedKey === "Roma" ){
        aFormData["Region"] = "Lazio";
        aFormData["PostalCode"] = "00100";
        aFormData["Country"] = "Italia";
      } else if( selectedKey === "Milano" ) {
        aFormData["Region"] = "Lombardia";
        aFormData["PostalCode"] = "20019";
        aFormData["Country"] = "Italia";
      } else if( selectedKey === "Bologna"){
        aFormData["Region"] = "Emilia-Romagna";
        aFormData["PostalCode"] = "40121";
        aFormData["Country"] = "Italia";
      }
    },
   
    checkForm: function() {
      let aFormData = this.getView().getModel("formData").getData();
     
      for( let key in aFormData ){
        if( aFormData[key] == ""){
          sap.m.MessageToast.show("Valorizzare tutti i campi");
        }
      }
    },

     navBack: function () {
               var oBack = History.getInstance();
			var sPreviousHash = oBack.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home", true);
			}
            }

  });

}); 