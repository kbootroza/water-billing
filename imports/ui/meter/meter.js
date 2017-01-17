import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
//Import Page
import './meter.html';


//import Collection
import {WB_Meters} from '../../collection/meter';

//Tabular
import {MeterTabular} from '../../../both/tabular/meter';


let indexTmpl = Template.wb_meter,
    addTmpl = Template.wb_meterAdd,
    editTmpl = Template.wb_meterEdit;


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
        return MeterTabular;
    },
    updateDoc(){
       return Session.get('updateDoc');
        //return {name:"TEST",size:"2",memo:"test",maintenanceFee:12}
    },
    collection(){
        return WB_Meters;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Meters;
    }
});

editTmpl.helpers({
});


//====================================Event===================
indexTmpl.events({
    'click .edit'(){
        debugger;
        Session.set('updateDoc', this);
    },
    'click .remove'(){
        WB_Meters.remove(this._id);
    }
});
addTmpl.events({});
editTmpl.events({});

//====================================Destroy=================
indexTmpl.onDestroyed(function () {
});
addTmpl.onDestroyed(function () {
});
editTmpl.onDestroyed(function () {
});

//====================================Hook====================
AutoForm.hooks({
    wb_meterAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('#wb_meterAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded')
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded')
        }
    },
    wb_meterEdit: {
        onSuccess: function (formType, result) {
            $('#wb_meterEditModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded')
        },
        onError: function (formType, error) {


        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
})