import {Meteor} from 'meteor/meteor';
import {WB_CustomerType} from "../imports/collection/customerType";

Meteor.publish('meteorUser', function meteorUser({_id}){
    if(this.userId){
        let user =  Meteor.users.find({_id});
        return user;
    }
    return this.ready();
});

Meteor.publish('wb_customerTypeById', function meteorUser({_id}){
    if(this.userId){
        let doc =  WB_CustomerType.find({_id});
        return doc;
    }
    return this.ready();
});