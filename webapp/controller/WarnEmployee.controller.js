sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"

], function (BaseController, JSONModel, Fragment, Filter, FilterOperator, History, MessageBox) {
    "use strict";

    return BaseController.extend("gruppo3.gruppo3.controller.WarnEmployee", {
        onInit: function () {

        },

        handleValueHelp: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();

            // create value help dialog
            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "gruppo3.gruppo3.view.Dialog",
                    controller: this
                }).then(function (oValueHelpDialog) {
                    oView.addDependent(oValueHelpDialog);
                    return oValueHelpDialog;
                });
            }

            this._pValueHelpDialog.then(function (oValueHelpDialog) {

                // open value help dialog filtered by the input value
                oValueHelpDialog.open(sInputValue);
            });
        },

        _handleValueHelpSearch: function (evt) {

            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "EmployeeID",
                FilterOperator.Contains,
                sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);
        },

        liveChange: function (oEvent) {

            let regex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            if (oEvent.getParameter("value").match(regex)) {
                oEvent.getSource().setValue("");
            }
        },
        id: function (input) {
            let sSuppliers = this.getView().getModel("Employees").getData().Suppliers;
            let check = false;
            sSuppliers.forEach(obj => {
                if (input === obj.SupplierID) {
                    check = true;
                }
            });
            return check;
        },

        onValueHelpClose: function (oEvent) {

            var oSelectedItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectedItem) {
                return;
            }

            this.byId("inputID").setValue(oSelectedItem.getTitle());
        },

        onCloseDialog: function () {
            this.byId("valueHelpDialog").close();
        },

        click: function (oEvent) {
                var valore = this.byId("inputID").getValue();
                var oModel = this.getOwnerComponent().getModel();
                var emp = oModel.oData;
                var val = false
                for (let obj in emp) {
                    if (emp[obj].EmployeeID == valore) {
                        val = true
                        this.byId("eQuickView").setEnabled(true)
                    }
                }
                if (!val) {
                    this.byId("eQuickView").setEnabled(false)
                    return MessageBox.error("Nessun Impiegato associato")
                }
            },

        onIndietro: function () {
            var oBack = History.getInstance();
            var sPreviousHash = oBack.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Home", true);
            }
        },

        openQuickView: function () {
            var oView = this.getView();

            if (!this._pQuickView) {
                this._pQuickView = Fragment.load({
                    id: oView.getId(),
                    name: "gruppo3.gruppo3.view.QuickView",
                    controller: this
                }).then(function (oQuickView) {
                    oView.addDependent(oQuickView);
                    return oQuickView;
                });
            }
        },
        onQuick: function (oEvent) {
            var oModel = this.getOwnerComponent().getModel();
            var Data = oModel.oData;
            var EmployeeID = this.byId("inputID").getValue();
            var Citta = Data[`Employees(${EmployeeID})`].City;
            var oButton = oEvent.getSource()

            $.ajax({
                method: "GET",
                url: `https://api.openweathermap.org/data/2.5/weather?q=${Citta}&appid=5ce55d720929c2c516045ce60b27de43`,
                success: (oData, oResponse) => {
                    this.openQuickView();
                    this._pQuickView.then((oQuickView) => {

                        var tempo = new JSONModel({
                            city: oData.name,
                            country: oData.country,
                            description: oData.weather[0].description,
                            temp_max: oData.main.temp_max,
                            temp_min: parseInt(oData.main.temp_min - 273),
                            email: false
                        });
                        if (tempo.oData.temp_min <= 20) {
                            tempo.oData.email = true;
                        }
                        oQuickView.setModel(tempo, "tempo")
                        oQuickView.openBy(oButton)
                    })
                },
                error: function (oResponse) {

                }
            })
        }
    });
});


