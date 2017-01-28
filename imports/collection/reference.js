/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_Reference = new Mongo.Collection("wb_reference");
export const VW_Reference = new Mongo.Collection("vw_reference");

WB_Reference.schema = new SimpleSchema({

    code:{
        type: String,
        label: "Code",
        optional: true
    },
    name: {
        type: String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    referenceTypeId: {
        type: String,
        autoform: {
            type: "select"
        }
    }

});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Reference.attachSchema(WB_Reference.schema);
});


