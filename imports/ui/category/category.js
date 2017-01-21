import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './category.html';


//import Collection
import {WB_Category} from '../../collection/category';

//Tabular
import {CategoryTabular} from '../../../both/tabular/category';


let indexTmpl = Template.wb_category,
    addTmpl = Template.wb_categoryAdd,
    editTmpl = Template.wb_categoryEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(()=>{
        let id = FlowRouter.getParam('categoryId');
        if(id){
            this.subscription = Meteor.subscribe('wb_categoryById', {_id: id});
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
        return CategoryTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Category;
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        console.log(instance.subUserReady.get());
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Category;
    },
    data(){

        let id = FlowRouter.getParam('categoryId');
        return WB_Category.findOne(id);
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e,t){
        var self=this;
        alertify.confirm(
            "Category",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Category.remove(self._id, function (error) {
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
        FlowRouter.go(`/waterBilling/category/${rowData._id}/edit`);
    }
})

addTmpl.events({})

editTmpl.events({
    'click .cancel'(e,t){
        FlowRouter.go(`/waterBilling/category`);
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
    wb_categoryAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('#wb_categoryAddModal').modal('close');
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_categoryEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/category`);
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