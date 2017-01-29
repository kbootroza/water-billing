import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './quartier.html';


//import Collection
import {WB_Quartier} from '../../collection/quartier';

//Tabular
import {QuartierTabular} from '../../../both/tabular/quartier';
import {clearSelect2} from "../../../client/libs/clear-select";


let indexTmpl = Template.wb_quartier,
    addTmpl = Template.wb_quartierAdd,
    editTmpl = Template.wb_quartierEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {
    this.districtData = new ReactiveVar([]);
    Meteor.call('fetchGeneralDistrictData', (err, result) => {
        if (result) {
            this.districtData.set(result);
        }
    });
});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.districtData = new ReactiveVar([]);
    Meteor.call('fetchGeneralDistrictData', (err, result) => {
        if (result) {
            this.districtData.set(result);
        }
    });
    this.autorun(() => {
        let id = FlowRouter.getParam('quartierId');
        if (id) {
            this.subscription = Meteor.subscribe('wb_quartierById', {_id: id});
        }
    });

});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {
    $('.modal').modal();
    $('[name="districtCodeId"]').select2();
});

editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true);
            Meteor.setTimeout(function () {
                $('[name="districtCodeId"]').select2();
            }, 500);
        }
    });
});

//====================================Helper==================
indexTmpl.helpers({
    dataTable(){
        return QuartierTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Quartier;
    },
    fetchGeneralDistrict(){
        let instance = Template.instance();
        return instance.districtData.get();
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Quartier;
    },
    data(){

        let id = FlowRouter.getParam('quartierId');
        return WB_Quartier.findOne(id);
    },
    fetchGeneralDistrict(){
        let instance = Template.instance();
        return instance.districtData.get();
    }
});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e, t){
        var self = this;
        alertify.confirm(
            "Quartier",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Quartier.remove(self._id, function (error) {
                    if (error) {
                        // alertify.error(error.message);
                        Materialize.toast(error.message, 3000, 'red rounded');
                    } else {
                        // alertify.success("Success");
                        Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
                    }
                });
            },
            null
        );
    },
    'dblclick tbody > tr' (event, instance) {

        let dataTalbe = $(event.currentTarget).closest('table').DataTable();
        let rowData = dataTalbe.row(event.currentTarget).data();
        FlowRouter.go(`/waterBilling/quartier/${rowData._id}/edit`);
    }
})

addTmpl.events({})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/quartier`);
    }
})


//====================================Destroy=================
indexTmpl.onDestroyed(function () {


})

addTmpl.onDestroyed(function () {


})

editTmpl.onDestroyed(function () {


})


//====================================Hook====================
AutoForm.hooks({
    wb_quartierAdd: {
        before: {
            insert: function (doc) {
                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            clearSelect2($('[name="districtId"]'));
            $('#wb_quartierAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_quartierEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/quartier`);
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');

        },
        onError: function (formType, error) {


        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
})