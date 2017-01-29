import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './block.html';


//import Collection
import {WB_Block} from '../../collection/block';

//Tabular
import {BlockTabular} from '../../../both/tabular/block';
import {clearSelect2} from "../../../client/libs/clear-select";


let indexTmpl = Template.wb_block,
    addTmpl = Template.wb_blockAdd,
    editTmpl = Template.wb_blockEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {
    this.districtCodeData = new ReactiveVar([]);
    this.districtCode = new ReactiveVar();
    this.quartierCodeData = new ReactiveVar([]);
    Meteor.call('fetchGeneralDistrictData', (err, result) => {
        if (result) {
            this.districtCodeData.set(result);
        }
    });
    this.autorun(() => {
        let districtCodeId = this.districtCode.get();
        if (districtCodeId) {
            Meteor.call('fetchQuartierByDistrictCodeId', districtCodeId, (err, result) => {
                if (result) {
                    this.quartierCodeData.set(result);
                }
            });
        }
    });
});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.districtCodeData = new ReactiveVar([]);
    this.districtCode = new ReactiveVar();
    this.quartierCodeData = new ReactiveVar([]);
    Meteor.call('fetchGeneralDistrictData', (err, result) => {
        if (result) {
            this.districtCodeData.set(result);
        }
    });
    this.autorun(() => {
        let id = FlowRouter.getParam('blockId');
        let districtCodeId = this.districtCode.get();
        if (id) {
            this.subscription = Meteor.subscribe('wb_blockById', {_id: id});
            console.log(this.subscription);
        }
        if (districtCodeId) {
            Meteor.call('fetchQuartierByDistrictCodeId', districtCodeId, (err, result) => {
                if (result) {
                    this.quartierCodeData.set(result);
                }
            });
        }
    });
});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {
    $('.modal').modal();
    $('[name="districtCode"]').select2();
    $('[name="quartierCode"]').select2();
});

editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true);
            Meteor.setTimeout(function() {
                $('[name="districtCode"]').select2();
                $('[name="quartierCode"]').select2();
            },500);
            let id = FlowRouter.getParam('blockId');
            let block = WB_Block.findOne(id);
            this.districtCode.set(block.districtCode);
        }
    });
});

//====================================Helper==================
indexTmpl.helpers({
    dataTable(){
        return BlockTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Block;
    },
    districtCodeData(){
        let instance = Template.instance();
        return instance.districtCodeData.get();
    },
    quartierCodedata(){
        let instance = Template.instance();
        return instance.quartierCodeData.get();
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        console.log(instance.subUserReady.get());
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Block;
    },
    data(){

        let id = FlowRouter.getParam('blockId');
        return WB_Block.findOne(id);
    },
    districtCodeData(){
        let instance = Template.instance();
        return instance.districtCodeData.get();
    },
    quartierCodedata(){
        let instance = Template.instance();
        return instance.quartierCodeData.get();
    }
});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e, t){
        var self = this;
        alertify.confirm(
            "Block",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Block.remove(self._id, function (error) {
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
        FlowRouter.go(`/waterBilling/block/${rowData._id}/edit`);
    }
});

addTmpl.events({
    'change [name="districtCode"]'(event,instance){
        instance.districtCode.set(event.currentTarget.value);
    }
});

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/block`);
    },
    'change [name="districtCode"]'(event,instance){
        instance.districtCode.set(event.currentTarget.value);
    }
});


//====================================Destroy=================
indexTmpl.onDestroyed(function () {


});

addTmpl.onDestroyed(function () {


});

editTmpl.onDestroyed(function () {


});


//====================================Hook====================
AutoForm.hooks({
    wb_blockAdd: {
        before: {
            insert: function (doc) {
                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            clearSelect2($("[name='districtCode']"));
            clearSelect2($("[name='quartierCode']"));
            $('#wb_blockAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_blockEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/block`);
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');

        },
        onError: function (formType, error) {


        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
});