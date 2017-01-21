import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './position.html';


//import Collection
import {WB_Position} from '../../collection/position';

//Tabular
import {PositionTabular} from '../../../both/tabular/position';


let indexTmpl = Template.wb_position,
    addTmpl = Template.wb_positionAdd,
    editTmpl = Template.wb_positionEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(()=>{
        let id = FlowRouter.getParam('positionId');
        if(id){
            this.subscription = Meteor.subscribe('wb_positionById', {_id: id});
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
        return PositionTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Position;
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Position;
    },
    data(){

        let id = FlowRouter.getParam('positionId');
        return WB_Position.findOne(id);
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e,t){
        var self=this;
        alertify.confirm(
            "Position",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Position.remove(self._id, function (error) {
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
        FlowRouter.go(`/waterBilling/position/${rowData._id}/edit`);
    }
})

addTmpl.events({})

editTmpl.events({
    'click .cancel'(e,t){
        FlowRouter.go(`/waterBilling/position`);
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
    wb_positionAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('#wb_positionAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_positionEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/position`);
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