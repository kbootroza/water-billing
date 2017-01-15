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
    dataTable(){
        return CustomerTypeTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_CustomerType;
    }
});

editTmpl.helpers({});


//====================================Event===================
indexTmpl.events({

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
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('#wb_customerTypeAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded')
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded')
        }
    },
    wb_customerTypeEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {


        },
        onError: function (formType, error) {


        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
})