import {Meteor} from 'meteor/meteor';
import {WB_ReferenceType} from '../../../imports/collection/referenceType'

Meteor.methods({
    wp_fetchReferenceType(){
        let list = [];
        if (Meteor.userId()) {
            WB_ReferenceType.find().fetch().forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });
        }
        return list;
    }
});