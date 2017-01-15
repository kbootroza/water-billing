import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';

//Import Page
import './customerType.html';


//import Collection
import {WB_CustomerType} from '../../collection/customerType';

//Tabular
import {CustomerTypeTabular} from '../../../both/tabular/customerType';



let indexTmpl = Template.wb_customerType,
    addTmpl = Template.wb_customerTypeAdd,
    editTmpl = Template.wb_customerTypeEdit;


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
    $('.modal').modal();
});

editTmpl.onRendered(function () {

});

//====================================Helper==================
indexTmpl.helpers({
    schema() {
        return WB_CustomerType;
    },
    dataTable(){
        return CustomerTypeTabular;
    }
});

addTmpl.helpers({});

editTmpl.helpers({});


//====================================Event===================
indexTmpl.events({
    'click .add': function (e, t) {
        $('#modal_add').modal('open');
    }

})

addTmpl.events({})

editTmpl.events({})


//====================================Destroy=================
indexTmpl.onDestroyed(function () {


})

addTmpl.onDestroyed(function () {


})

editTmpl.onDestroyed(function () {


})


//====================================Hook====================
AutoForm.hooks({
    wb_customerTypeAdd: {
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
    wb_customerTypeEdit: {
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