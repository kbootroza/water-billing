import {Meteor} from 'meteor/meteor';
import {WB_CustomerType} from "../imports/collection/customerType";
import {WB_Customer} from "../imports/collection/customer";

//Customer Type
Meteor.publish('wb_customerTypeById', function meteorUser({_id}){
    if(this.userId){
        let doc =  WB_CustomerType.find({_id});
        return doc;
    }
    return this.ready();
});

//Customer
Meteor.publish('wb_customerById', function meteorUser({_id}){
    if(this.userId){
        Meteor._sleepForMs(1000);
        let doc =  WB_Customer.find({_id});
        return doc;
    }
    return this.ready();
});