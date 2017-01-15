/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_Customer=new Mongo.Collection("wb_customer");

WB_Customer.schema = new SimpleSchema({

    no: {
        type: String,
        label: "No"
    },
    name: {
        type: String,
        label: "Name"
    },
    khName: {
        type: String,
        label: "Khmer Name"
    }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Customer.attachSchema(WB_Customer.schema);
});


