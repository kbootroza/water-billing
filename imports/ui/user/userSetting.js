import './userSetting.html';
import {FlowRouter} from 'meteor/kadira:flow-router'
import {Template} from 'meteor/templating'
// import collection
import {UserSchema} from '../../collection/userSchema'
// import tabular
import {UserSettingTabular} from '../../../both/tabular/userSetting'

let index = Template.wb_userSetting,
    userSettingOptions = Template.wb_userSettingOptions,
    addTmpl = Template.wb_userAdd,
    editTmpl = Template.wb_userSettingEdit;
index.helpers({
    selector() {
        return {username: {$ne: 'super'}}
    },
    dataTable() {
        return UserSettingTabular
    }
});

index.events({
    'dblclick tbody > tr'(event, instance) {
        let dataTalbe = $(event.currentTarget).closest('table').DataTable();
        let rowData = dataTalbe.row(event.currentTarget).data();
        FlowRouter.go(`/waterBilling/user-setting/${rowData._id}/edit`)
    },
    'click .remove'(event, instance){
        var self = this;
        alertify.confirm(
            "Remove User",
            "Are you sure to delete [" + self.username + "]?",
            function () {
                if (Meteor.userId() == self._id) {
                    Materialize.toast("You can not remove your own account while logging in", 3000, 'red rounded')
                } else {
                    Meteor.call('wb.removeUser', {userId: self._id}, function (error, result) {
                        if (error) {
                            // alertify.error(error.message);
                            Materialize.toast(error.message, 3000, 'red rounded');
                        } else {
                            // alertify.success("Success");
                            Materialize.toast('Successful', 3000, 'lime accent-4 rounded');
                        }
                    })
                }
            },
            null
        );
    }
});

userSettingOptions.onRendered(function () {
    $('.dropdown-button').dropdown()
});
addTmpl.onCreated(function () {
    this.geoProvinces = new ReactiveVar([]);
    this.geoArea = new ReactiveVar([]);
    this.provinceId = new ReactiveVar();
    Meteor.call('fetchProvinces', (err, result) => {
        if (result) {
            this.geoProvinces.set(result);
        }
    });
    this.autorun(() => {
        let provinceId = this.provinceId.get()
        if (provinceId) {
            Meteor.call('fetchDistricts', provinceId, (err, result) => {
                if (result) {
                    this.geoArea.set(result);
                }
            });
        }
    });
});
addTmpl.onRendered(function () {
    $('[name="rolesArea"]').select2();
    $('[name="rolesBranch"]').select2();
});
addTmpl.helpers({
    schema() {
        return UserSchema
    },
    area(){
        return Session.get('area');
    },
    geoProvinces(){
        let instance = Template.instance();
        return instance.geoProvinces.get();
    },
    geoArea(){
        let instance = Template.instance();
        return instance.geoArea.get();
    }
});
addTmpl.events({
    'change [name="rolesBranch"]'(event, instance){
        let currentValue = event.currentTarget.value;
        if (currentValue != '') {
            instance.provinceId.set(currentValue);
        }
    }
});
editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.userData = new ReactiveVar([]);
    this.geoProvinces = new ReactiveVar([]);
    this.geoArea = new ReactiveVar([]);
    this.provinceId = new ReactiveVar();
    this.requestMethodReady = new ReactiveVar(false);
    Meteor.call('fetchProvinces', (err, result) => {
        if (result) {
            this.geoProvinces.set(result);
        }
    });
    this.autorun(() => {
        let paramUid = FlowRouter.getParam('userId');
        if (paramUid) {
            Meteor.call('_getUser', {_id: paramUid}, (err, result) => {
                if (result) {
                    this.userData.set(result);
                    this.subUserReady.set(true);
                    if (result.rolesBranch) {
                        this.provinceId.set(result.rolesBranch);
                    }
                    this.requestMethodReady.set(true);
                }
            });
        }
    });
    this.autorun(() => {
        let provinceId = this.provinceId.get();
        console.log(provinceId);
        if (provinceId) {
            Meteor.call('fetchDistricts', provinceId, (err, result) => {
                if (result) {
                    this.geoArea.set(result);
                }
            });
        }

    });
});
editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.requestMethodReady.get()) {
            Meteor.setTimeout(function () {
                $('[name="rolesBranch"]').select2();
            }, 500);
        }
    });
});
editTmpl.helpers({
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    schema() {
        return UserSchema
    },
    data() {
        let instance = Template.instance();
        let user = instance.userData.get();
        return user
    },
    area(){
        return Session.get('area');
    },
    geoProvinces(){
        let instance = Template.instance();
        return instance.geoProvinces.get();
    },
    geoArea(){
        let instance = Template.instance();
        return instance.geoArea.get();
    }
});
editTmpl.events({
    'change [name="rolesBranch"]'(event, instance){
        let currentValue = event.currentTarget.value;
        if (currentValue != '') {
            instance.provinceId.set(currentValue);
        }
    }
});
AutoForm.hooks({
    wb_userEdit: {
        onSuccess(formType, result){
            Materialize.toast('Updated successfully', 3000, 'lime accent-4 rounded');
            FlowRouter.query.unset();
            FlowRouter.go('wb.userSetting')
        },
        onError(formType, err){
            FlowRouter.query.unset();
            Materialize.toast(err.message, 3000, 'red rounded');
        }
    },
    wb_userAdd: {
        onSuccess(formType, result){
            Meteor.setTimeout(function () {
                FlowRouter.query.unset();
                Materialize.toast('Successfully Created', 3000, 'lime accent-4 rounded');
            }, 500);
        },
        onError(formType, err){
            Meteor.setTimeout(function () {
                FlowRouter.query.unset();
                Materialize.toast(err.message, 3000, 'red rounded');
            }, 500);
        }
    }
});