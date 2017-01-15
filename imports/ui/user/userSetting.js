import './userSetting.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
//import collection
import {UserSchema} from '../../collection/userSchema';
//import tabular
import {UserSettingTabular} from '../../../both/tabular/userSetting';

let index = Template.wb_userSetting,
    userSettingOptions = Template.wb_userSettingOptions,
    editTmpl = Template.wb_userSettingEdit;
index.helpers({
    dataTable(){
        return UserSettingTabular;
    }
});

index.events({
    'dblclick tbody > tr' (event, instance) {
        let dataTalbe = $(event.currentTarget).closest('table').DataTable();
        let rowData = dataTalbe.row(event.currentTarget).data();
        FlowRouter.go(`/waterBilling/user-setting/${rowData._id}/edit`);
    }
});

userSettingOptions.onRendered(function () {
    $(".dropdown-button").dropdown();
});

editTmpl.onCreated(function(){
    this.subUserReady = new ReactiveVar(false);
    this.autorun(()=>{
        let paramUid = FlowRouter.getParam('userId');
        console.log(paramUid);
        if(paramUid){
            this.subscription = Meteor.subscribe('meteorUser', {_id: paramUid});
        }
    });
});

editTmpl.onRendered(function(){
    this.autorun(()=>{
        if(this.subscription.ready()){
            this.subUserReady.set(true)
        }
    });
});

editTmpl.helpers({
    subscriptionsReady(){
        let instance = Template.instance();
        return instance.subUserReady.get();
    },
     schema(){
         return UserSchema;
     },
     data(){
         return Meteor.users.findOne(Meteor.userId());
     }
});