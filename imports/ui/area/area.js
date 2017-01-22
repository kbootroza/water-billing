import './area.html';
let indexTmpl = Template.waterBilling_area;
//import schema
import {areaSchema} from '../../collection/area';
indexTmpl.onCreated(function () {
    this.rolesBranch = new ReactiveVar([]);
    this.rolesArea = new ReactiveVar([]);
    this.fetchGeoReady = new ReactiveVar(false);
    this.provinceId = new ReactiveVar();
    this.autorun(() => {
        Meteor.call('fetchRolesBranch', Meteor.userId(), (err, result) => {
            if (result) {
                this.rolesBranch.set(result);
            }
        });
    });
    this.autorun(() => {
        let provinceId = this.provinceId.get();
        let userId = Meteor.userId();
        if (provinceId || userId) {
            Meteor.call('fetchRolesArea', Meteor.userId(), provinceId, (err, result) => {
                if (result) {
                    this.rolesArea.set(result);
                    this.fetchGeoReady.set(true);
                }
            });
        }
    });
});

indexTmpl.helpers({
    fetchGeoDataReady(){
        let instance = Template.instance();
        return instance.fetchGeoReady.get();
    },
    rolesBranchOptions(){
        let instance = Template.instance();
        return instance.rolesBranch.get();
    },
    rolesAreaOptions(){
        let instance = Template.instance();
        return instance.rolesArea.get();
    },
    schema() {
        return areaSchema;
    }
});
indexTmpl.events({
    'change [name="rolesBranch"]'(event, instance){
        let currentValue = event.currentTarget.value;
        if (currentValue != '') {
            instance.provinceId.set(currentValue);
        }
    }
});
AutoForm.hooks({
    area: {
        onSubmit(doc) {
            if (doc.area != '') {
                Session.set('area', doc.rolesArea);
            }
            return false;
        }
    }
})