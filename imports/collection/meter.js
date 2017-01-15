import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


export const WB_Meters = new Mongo.Collection("wb_meters");

WB_Meters.schema = new SimpleSchema({

    name: {
        type: String,
        label: "Name"
    },
    size: {
        type: String,
        label: "size"
    },
    memo: {
        type: String,
        label: "Memo"
    },
    maintenanceFee: {
        type: Number,
        label: "maintenanceFee",
        decimal: true
    }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Meters.attachSchema(WB_Meters.schema);
});


