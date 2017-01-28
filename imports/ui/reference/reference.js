import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './reference.html';


//import Collection
import {WB_Reference} from '../../collection/reference';

//Tabular
import {ReferenceTabular} from '../../../both/tabular/reference';


let indexTmpl = Template.wb_reference,
    addTmpl = Template.wb_referenceAdd,
    editTmpl = Template.wb_referenceEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

    this.referenceType = new ReactiveVar([]);

    Meteor.call('wp_fetchReferenceType', (err, result) => {
        if (result) {
            this.referenceType.set(result);
        }
    });
});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('referenceId');
        if (id) {
            this.subscription = Meteor.subscribe('wb_referenceById', {_id: id});
            console.log(this.subscription);
        }
    });

    this.referenceType = new ReactiveVar([]);
    Meteor.call('wp_fetchReferenceType', (err, result) => {
        if (result) {
            this.referenceType.set(result);
        }
    });
});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {
    $('.modal').modal();
    $('[name="referenceTypeId"]').select2();
});

editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true)
            Meteor.setTimeout(function () {
                $('[name="referenceTypeId"]').select2();
            }, 500);
        }
    });
});

//====================================Helper==================
indexTmpl.helpers({
    dataTable(){
        return ReferenceTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Reference;
    },
    referenceType(){
        let instance = Template.instance();
        return instance.referenceType.get();
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Reference;
    },
    data(){
        let id = FlowRouter.getParam('referenceId');
        return WB_Reference.findOne(id);
    },
    referenceType(){
        let instance = Template.instance();
        return instance.referenceType.get();
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e, t){
        var self = this;
        alertify.confirm(
            "Reference",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Reference.remove(self._id, function (error) {
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
        FlowRouter.go(`/waterBilling/reference/${rowData._id}/edit`);
    }
})

addTmpl.events({})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/reference`);
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
    wb_referenceAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('#wb_referenceAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_referenceEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/reference`);
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