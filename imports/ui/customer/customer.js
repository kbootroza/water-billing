import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';

//Import Page
import './customer.html';


//import Collection
import {WB_Customer} from '../../collection/customer';

//Tabular
import {CustomerTabular} from '../../../both/tabular/customer';


let indexTmpl = Template.wb_customer,
    addTmpl = Template.wb_customerAdd,
    editTmpl = Template.wb_customerEdit;
detailTmpl = Template.wb_customerDetail;


//====================================State===================


//====================================Create==================

indexTmpl.onCreated(function () {

});
addTmpl.onCreated(function () {

});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('customerId');
        if (id) {
            this.subscription = Meteor.subscribe('wb_customerById', {_id: id});
            console.log(this.subscription);
        }
    });
});

detailTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('customerId');
        if (id) {
            this.subscription = Meteor.subscribe('wb_customerById', {_id: id});
            console.log(this.subscription);
        }
    });
});


//====================================Render==================
indexTmpl.onRendered(function () {

});

addTmpl.onRendered(function () {

});

editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true)
        }
    });
});

detailTmpl.onRendered(function () {
    $('ul.tabs').tabs();
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true)

        }
    });
})

//====================================Helper==================
indexTmpl.helpers({
    dataTable(){
        return CustomerTabular;
    }
});

addTmpl.helpers({
    collection(){
        return WB_Customer;
    }
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        console.log(instance.subUserReady.get());
        return instance.subUserReady.get();
    },
    collection(){
        return WB_Customer;
    },
    data(){
        let id = FlowRouter.getParam('customerId');
        return WB_Customer.findOne(id);
    }

});
detailTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        console.log(instance.subUserReady.get());
        return instance.subUserReady.get();
    },
    data(){
        let id = FlowRouter.getParam('customerId');
        return WB_Customer.findOne(id);
    }

});


//====================================Event===================
indexTmpl.events({
    'click .remove'(e, t){
        var self = this;
        alertify.confirm(
            "Customer Type",
            "Are you sure to delete [" + self._id + "]?",
            function () {
                WB_Customer.remove(self._id, function (error) {
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
        FlowRouter.go(`/waterBilling/customer/${rowData._id}/detail`);
    },
    'click .add'(e, t){
        FlowRouter.go(`/waterBilling/customer/add`);
    },
    'click .edit'(e, t){
        let self = this;
        FlowRouter.go(`/waterBilling/customer/${self._id}/edit`);
    }
})

addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/customer`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/customer`);
    }
})

detailTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/waterBilling/customer`);
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
    wb_customerAdd: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/customer`);
            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
        },
        onError: function (formType, error) {
            Materialize.toast(error.message, 3000, 'red rounded');
        }
    },
    wb_customerEdit: {
        before: {
            insert: function (doc) {

            }
        },
        onSuccess: function (formType, result) {
            FlowRouter.go(`/waterBilling/customer`);
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