import {Meteor} from 'meteor/meteor';
import {WB_Reference} from '../../../imports/collection/reference'

Meteor.methods({
    wp_fetchType(){
        let list = [];
        if (Meteor.userId()) {
            WB_Reference.find({_id: "001"}).fetch().forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });
        }
        return list;
    },
    wp_fetchMeasure(){
        let list = [];
        if (Meteor.userId()) {
            WB_Reference.find({_id: "002"}).fetch().forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });
        }
        return list;
    },
    wp_fetchFloorBy(){
        let list = [];
        if (Meteor.userId()) {
            WB_Reference.find({_id: "003"}).fetch().forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });
        }
        return list;
    }
});