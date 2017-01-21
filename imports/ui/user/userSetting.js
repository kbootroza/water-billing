import './userSetting.html'
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
                if(Meteor.userId() == self._id) {
                    Materialize.toast("You can not remove your own account while logging in", 3000, 'red rounded')
                }else{
                    Meteor.call('wb.removeUser', {_id: self._id}, function (error, result) {
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
addTmpl.helpers({
    schema() {
        return UserSchema
    },
    area(){
        return Session.get('area');
    }
});

editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.userData = new ReactiveVar([]);
    this.autorun(() => {
        let paramUid = FlowRouter.getParam('userId');
        if (paramUid) {
            Meteor.call('_getUser', {_id: paramUid},(err,result) => {
                if(result) {
                    this.userData.set(result);
                    this.subUserReady.set(true);
                }
            });
        }
    })
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
    }
});

AutoForm.hooks({
    wb_userEdit: {
        onSuccess(formType, result){
            Materialize.toast('Updated successfully', 3000, 'lime accent-4 rounded');
            FlowRouter.go('wb.userSetting')
        },
        onError(formType,err){
            Materialize.toast(err.message, 3000, 'red rounded');
        }
    },
    wb_userAdd: {
        onSuccess(formType, result){
            Materialize.toast('Successfully Created', 3000, 'lime accent-4 rounded');
        },
        onError(formType,err){
            Materialize.toast(err.message, 3000, 'red rounded');
        }
    }
});