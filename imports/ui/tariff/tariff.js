import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './tariff.html';


//import Collection
import {WB_Tariff} from '../../collection/tariff';

//Tabular
import {TariffTabular} from '../../../both/tabular/tariff';


let indexTmpl = Template.wb_tariff,
    addTmpl = Template.wb_tariffAdd,
    editTmpl = Template.wb_tariffEdit;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

    this.category = new ReactiveVar([]);
    this.type = new ReactiveVar([]);
    this.measure = new ReactiveVar([]);
    this.floorBy = new ReactiveVar([]);

    Meteor.call('wp_fetchCategory', (err, result) => {
        if (result) {
            this.category.set(result);
        }
    });
    Meteor.call('wp_fetchType', (err, result) => {
        if (result) {
            this.type.set(result);
        }
    });
    Meteor.call('wp_fetchMeasure', (err, result) => {
        if (result) {
            this.measure.set(result);
        }
    });
    Meteor.call('wp_fetchFloorBy', (err, result) => {
        if (result) {
            this.floorBy.set(result);
        }
    });
});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('tariffId');
        if (id) {
            this.subscription = Meteor.subscribe('wb_tariffById', {_id: id});
            console.log(this.subscription);
        }
    });

    this.category = new ReactiveVar([]);
    this.type = new ReactiveVar([]);
    this.measure = new ReactiveVar([]);
    this.floorBy = new ReactiveVar([]);

    Meteor.call('wp_fetchCategory', (err, result) => {
        if (result) {
            this.category.set(result);
        }
    });
    Meteor.call('wp_fetchType', (err, result) => {
        if (result) {
            this.type.set(result);
        }
    });
    Meteor.call('wp_fetchMeasure', (err, result) => {
        if (result) {
            this.measure.set(result);
        }
    });
    Meteor.call('wp_fetchFloorBy', (err, result) => {
        if (result) {
            this.floorBy.set(result);
        }
    });
});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {
    $('.modal').modal();
    $('[name="categoryId"]').select2();
    $('[name="typeId"]').select2();
    $('[name="measureId"]').select2();
    $('[name="floorById"]').select2();

});

editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true)
            Meteor.setTimeout(function () {
                $('[name="categoryId"]').select2();
                $('[name="typeId"]').select2();
                $('[name="measureId"]').select2();
                $('[name="floorById"]').select2();

            }, 500);
        }
    });
});

//====================================Helper==================
indexTmpl.helpers({
    dataTable(){
        return TariffTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Tariff;
    },
    category(){
        let instance = Template.instance();
        return instance.category.get();
    },
    type(){
        let instance = Template.instance();
        return instance.type.get();
    },
    measure(){
        let instance = Template.instance();
        return instance.measure.get();
    },
    floorBy(){
        let instance = Template.instance();
        return instance.floorBy.get();
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Tariff;
    },
    data(){
        let id = FlowRouter.getParam('tariffId');
        return WB_Tariff.findOne(id);
    },
    category(){
        let instance = Template.instance();
        return instance.category.get();
    },
    type(){
        let instance = Template.instance();
        return instance.type.get();
    },
    measure(){
        let instance = Template.instance();
        return instance.measure.get();
    },
    floorBy(){
        let instance = Template.instance();
        return instance.floorBy.get();
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e, t){
        var self = this;
        alertify.confirm(
            "Tariff",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Tariff.remove(self._id, function (error) {
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
    'click .add'(e, t){
            FlowRouter.go(`/waterBilling/tariff/add`);
        }

    ,
    'dblclick tbody > tr' (event, instance) {

        let dataTalbe = $(event.currentTarget).closest('table').DataTable();
        let rowData = dataTalbe.row(event.currentTarget).data();
        FlowRouter.go(`/waterBilling/tariff/${rowData._id}/edit`);
    }
})

addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/tariff`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/tariff`);
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
    wb_tariffAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/tariff`);
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_tariffEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/tariff`);
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