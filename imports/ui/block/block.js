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


let indexTmpl = Template.wb_block,
    addTmpl = Template.wb_blockAdd,
    editTmpl = Template.wb_blockEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(()=>{
        let id = FlowRouter.getParam('blockId');
        if(id){
            this.subscription = Meteor.subscribe('wb_blockById', {_id: id});
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
        return BlockTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Block;
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
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e,t){
        var self=this;
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
})

addTmpl.events({})

editTmpl.events({
    'click .cancel'(e,t){
        FlowRouter.go(`/waterBilling/block`);
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
    wb_blockAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
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
})