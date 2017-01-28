import {Meteor} from 'meteor/meteor';
import {WB_Category} from '../../../imports/collection/category'

Meteor.methods({
    wp_fetchCategory(){
        let list = [];
        if (Meteor.userId()) {
            WB_Category.find().fetch().forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });
        }
        return list;
    }
});