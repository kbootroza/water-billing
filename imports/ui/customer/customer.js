import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';

//Import Page
import './customer.html';



//import Collection
import {WB_Customer} from '../../collection/customer';

let indexTmpl = Template.wb_customer,
    addTmpl=Template.wb_customerAdd,
    editTmpl=Template.wb_customerEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

});
editTmpl.onCreated(function () {

});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {

});

editTmpl.onRendered(function () {

});

//====================================Helper==================
indexTmpl.helpers({
    schema() {
        return WB_Customer;
    }
});

addTmpl.helpers({

});

editTmpl.helpers({

});



//====================================Event===================
indexTmpl.events({


})

addTmpl.events({


})

editTmpl.events({


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
    wb_customerAdd:{
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }, onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    },
    wb_customerEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");

        },
        onError: function (formType, error) {

            alertify.error(error.message);
        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
})