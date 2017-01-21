import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './class.html';


//import Collection
import {WB_Class} from '../../collection/class';

//Tabular
import {ClassTabular} from '../../../both/tabular/class';


let indexTmpl = Template.wb_class,
    addTmpl = Template.wb_classAdd,
    editTmpl = Template.wb_classEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(()=>{
        let id = FlowRouter.getParam('classId');
        if(id){
            this.subscription = Meteor.subscribe('wb_classById', {_id: id});
            console.log(this.subscription);
        }
    });
});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {
    $('.modal').modal();
});

editTmpl.onRendered(function () {
    this.autorun(()=>{
        if(this.subscription.ready()){
            this.subUserReady.set(true)
        }
    });
});

//====================================Helper==================
indexTmpl.helpers({
    dataTable(){
        return ClassTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Class;
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Class;
    },
    data(){

        let id = FlowRouter.getParam('classId');
        return WB_Class.findOne(id);
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e,t){
        var self=this;
        alertify.confirm(
            "Class",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Class.remove(self._id, function (error) {
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
        FlowRouter.go(`/waterBilling/class/${rowData._id}/edit`);
    }
})

addTmpl.events({})

editTmpl.events({
    'click .cancel'(e,t){
        FlowRouter.go(`/waterBilling/class`);
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
    wb_classAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('#wb_classAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_classEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/class`);
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